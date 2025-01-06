import gspread
from oauth2client.service_account import ServiceAccountCredentials
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.opera.service import Service

# from selenium.webdriver import Opera, OperaOptions
# # Set the path to the Opera driver executable
# executable_path = '/usr/local/bin/operadriver'
# # Set the options for the Opera browser
# options = OperaOptions()
# options.add_argument('-disable-gpu')
# options.add_argument('-no-sandbox')
# # Create a new instance of the Opera driver
# driver = Opera(executable_path=executable_path, options=options)

from logger import get_logger
# Get the module name
logger = get_logger("Generating Hotel Information")


def get_openai_response(website_url, website_name, driver):
    try:
        # Log the input parameters (website URL and name)
        logger.info(
            "Starting get_openai_response with website_name: %s, website_url: %s",
            website_name,
            website_url,
        )

        # Log the navigation to OpenAI
        logger.info("Navigating to the OpenAI website at https://chat.openai.com/")
        driver.get("https://chat.openai.com/")
        time.sleep(10)  # Wait for the page to load

        # Log the wait for input box
        logger.info("Waiting for the input box to load...")
        input_box = driver.find_element(By.CSS_SELECTOR, "#prompt-textarea p")
        logger.info("Input box located successfully.")

        time.sleep(
            2
        )  # Sleep to ensure the element is fully loaded before interacting with it


        # Prepare the prompt
        prompt = f"""
        Browse the given hotel website based on the provided name and URL. website name: {website_name}, website url: {website_url}. Return only a JSON response with the following fields. Ensure the response adheres strictly to the JSON structure, covering all possible edge cases, and use "NA" or "Not Available" where data is missing or inapplicable. Additionally, provide a specific tip to improve each of the following scores: `mobileResponsivenessOutOf10`, `loadingSpeedOutOf10`, `seoOptimizationOutOf10`, `userExperienceOutOf10`, and `bookingFlowOutOf10`. Use an empty string `""` as the tip if the score is perfect (10/10). The fields should include: - `isSiteFunctional` (true/false) - `belongsToThisHotel` (true/false) - `contactNumbers` (array of strings with contact numbers, or use `[]` if not available) - `emails` (array of strings with email addresses, or use `[]` if not available) - `hotelBookingAvailable` (true/false) - `sameDomainBooking` (true/false, whether hotel provides booking on the same domain) - `thirdPartyBookingDomain` (string, the domain used for booking if not on the same domain, or use "NA") - `category` ("hotel", "motel", or "others") - `ifOthersThenWhat` (string, describe the category if `category` is "others", or use "NA") - `mobileResponsivenessOutOf10` (integer, 1-10) - `mobileResponsivenessTip` (string, provide one tip to improve this score) - `loadingSpeedOutOf10` (integer, 1-10) - `loadingSpeedTip` (string, provide one tip to improve this score) - `seoOptimizationOutOf10` (integer, 1-10) - `seoOptimizationTip` (string, provide one tip to improve this score) - `userExperienceOutOf10` (integer, 1-10) - `userExperienceTip` (string, provide one tip to improve this score) - `bookingFlowOutOf10` (integer, 1-10, or use "NA" if not applicable) - `bookingFlowTip` (string, provide one tip to improve this score, or use "NA" if `bookingFlowOutOf10` is "NA") - `tips` (array of strings with general improvement suggestions or use `[]` if none) - `whatThisWebsiteDoesInOneLine` (string summarizing the website purpose, starting with "We found that your website...") Do not include explanations or extra text outside the JSON. Given the website name and URL, return only the JSON output adhering to the structure and filling in the fields appropriately.
        """
        
        # # Write the prompt to a file for reference
        # logger.info("Writing the prompt to file prompt.txt.")
        # with open("prompt.txt", "w") as f:
        #     f.write(prompt)

        # logger.info("Prompt has been written to file prompt.txt.")
        
        # # Log the reading of the prompt from file
        # logger.info("Reading prompt from file and sending it to the input box.")
        # with open("prompt.txt", "r") as f:
        #     prompt_content = f.read()

        input_box.send_keys(prompt)
        logger.info("Prompt sent to input box.")

        # Log the wait for the response
        logger.info("Waiting for the system to process and generate the response.")
        time.sleep(40)  # Wait for OpenAI to process and respond

        # Locate the response element
        try:
            response_element = driver.find_element(By.CLASS_NAME, "markdown")
            response = response_element.text
            logger.info("Response received successfully from OpenAI.")
        except Exception as e:
            logger.error("Error while locating response element: %s", e)
            return None

        # Log the cleaning and parsing of the response
        logger.info("Cleaning and parsing the JSON response.")
        cleaned_response = re.sub(r"(?i)json\s*Copy code\s*", "", response)

        try:
            response_json = json.loads(cleaned_response)
            logger.info("Response successfully parsed as JSON.")
            return response_json
        except json.JSONDecodeError as json_err:
            logger.error("Error decoding JSON response: %s", json_err)
            logger.error("Raw response before cleaning: %s", response)
            return None

    except Exception as e:
        logger.error("An unexpected error occurred in get_openai_response: %s", e)
        return None
    

import os
import json

def save_response_as_json(row_number, response_json, results_folder="results3"):
    """
    Save the response JSON to a file in the specified folder.

    Args:
        row_number (int): The row number being processed.
        response_json (dict): The response data to save.
        results_folder (str): The folder where the file should be saved. Default is 'results'.
    """
    # Ensure the results folder exists
    if not os.path.exists(results_folder):
        os.makedirs(results_folder)

    # Create the file path
    file_path = os.path.join(results_folder, f"{0+row_number}.json")

    # Save the JSON data to the file
    with open(file_path, "w") as json_file:
        json.dump(response_json, json_file, indent=4)

    print(f"Saved response to {file_path}")

                

def extractAndUpdateSheet(sheet, start, end, driver):
    """
    Process each row in the Google Sheet and update it with OpenAI response data.
    """
    # Fetch only the rows in the range
    data = sheet.get_all_records()[start - 2:end - 1]  # Adjust indices for zero-based lists
    
    for i, row in enumerate(data, start=start):  # Data starts from the specified range
        website_url = row["website"]
        website_name = row["name"]
        if row["visited"] == "visited":
            continue

        sheet.update_cell(i, 24, "visited")
        
        logger.info(f"Starting to process website: {website_name} ({website_url})")

        # Call the function to get the OpenAI response
        response_json = get_openai_response(website_url, website_name, driver)

        if response_json:
            logger.info(f"Received valid response for {website_name} ({website_url}). Proceeding to update the Google Sheet.")
            
            try:
                save_response_as_json(i, response_json)
                logger.info(f"Successfully saved response for row {i} to JSON file.")
                print(f"Saved response for row {i} to JSON file.")

            except Exception as e:
                logger.error(f"Error updating row {i} for website {website_name} ({website_url}): {e}")
                print(f"Failed to update row {i} due to an error.")
        
        else:
            logger.error(f"Failed to get a valid response for {website_name} ({website_url}).")
            print(f"Failed to get response for {website_name} ({website_url})")


def update_sheet_with_response(sheet, row_index, response_json):
    """
    Update the Google Sheet with the response JSON fields.
    """
    try:
        sheet.update_cell(row_index, 3, response_json.get("hotelBookingAvailable", "N/A"))
        contact_numbers = response_json.get("contactNumbers", ["N/A"])
        sheet.update_cell(row_index, 4, ", ".join(contact_numbers))
        
        emails = response_json.get("emails", ["N/A"])
        sheet.update_cell(row_index, 5, ", ".join(emails))
        
        sheet.update_cell(row_index, 6, response_json.get("mobileResponsivenessOutOf10", "N/A"))
        sheet.update_cell(row_index, 7, response_json.get("mobileResponsivenessTip", ""))
        
        sheet.update_cell(row_index, 8, response_json.get("loadingSpeedOutOf10", "N/A"))
        sheet.update_cell(row_index, 9, response_json.get("loadingSpeedTip", ""))
        
        sheet.update_cell(row_index, 10, response_json.get("seoOptimizationOutOf10", "N/A"))
        sheet.update_cell(row_index, 11, response_json.get("seoOptimizationTip", ""))
        
        sheet.update_cell(row_index, 12, response_json.get("userExperienceOutOf10", "N/A"))
        sheet.update_cell(row_index, 13, response_json.get("userExperienceTip", ""))
        
        sheet.update_cell(row_index, 14, response_json.get("bookingFlowOutOf10", "N/A"))
        sheet.update_cell(row_index, 15, response_json.get("bookingFlowTip", "NA"))
        
        tips = response_json.get("tips", ["No tips available"])
        sheet.update_cell(row_index, 16, ", ".join(tips))
        
        sheet.update_cell(row_index, 17, response_json.get("whatThisWebsiteDoesInOneLine", "N/A"))
        
        sheet.update_cell(row_index, 18, response_json.get("isSiteFunctional", "N/A"))
        sheet.update_cell(row_index, 19, response_json.get("belongsToThisHotel", "N/A"))
        sheet.update_cell(row_index, 20, response_json.get("sameDomainBooking", "N/A"))
        sheet.update_cell(row_index, 21, response_json.get("thirdPartyBookingDomain", "N/A"))
        sheet.update_cell(row_index, 22, response_json.get("category", "N/A"))
        sheet.update_cell(row_index, 23, response_json.get("ifOthersThenWhat", "N/A"))
        
        logger.info(f"Successfully updated row {row_index} with all response data.")

    except Exception as e:
        raise RuntimeError(f"Error while updating row {row_index}: {e}")


def dataExtractGpt(debugger_address, start, end, subsheet):
    # Setup for Google Sheets API
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive",
    ]
    creds = ServiceAccountCredentials.from_json_keyfile_name("thefirstweb.json", scope)
    client = gspread.authorize(creds)

    # Open Google Sheet by name
    sheet = client.open("Hotels_review_count_100_1").worksheet(subsheet)

    # Setup for Selenium WebDriver
    options = webdriver.ChromeOptions()
    options.debugger_address = debugger_address  # Specify the debugger address
    driver = webdriver.Chrome(options=options)



    # Specify the path to the OperaDriver executable
    # opera_driver_path = "/usr/local/bin/operadriver"  # Update with your OperaDriver path

    # # Setup options for Opera
    # options = webdriver.ChromeOptions()
    # options.binary_location = "/usr/bin/opera"  # Update with your Opera binary path

    # # Initialize OperaDriver with the options
    # driver = webdriver.Opera(executable_path=opera_driver_path, options=options)


    # Path to ChromeDriver
    # chrome_driver_path = "/usr/local/bin/operadriver"

    # Path to Opera Browser Executable
    # opera_browser_path = "/usr/bin/google-chrome"  # Change this to where Opera is installed

    # Configure Chrome options to use Opera
    # options = webdriver.ChromeOptions()
    # # options.binary_location = opera_browser_path  # Tell ChromeDriver to use Opera
    # options.debugger_address = debugger_address

    # # Initialize the driver
    # # service = Service(chrome_driver_path)
    # driver = webdriver.Chrome(options=options)


    chrome_driver_path = "/usr/local/bin/chromedriver"  # Path to ChromeDriver executable

    # Path to Opera Browser Executable
    # opera_browser_path = "/usr/bin/opera"  # Change this to the correct location of Opera browser

    # # Set up Chrome options to point to the Opera browser
    # options = Options()
    # options.binary_location = opera_browser_path  # Set Opera as the browser
    # options.debugger_address = debugger_address
    # options.add_argument('--verbose')


    # # You can also add other options if needed
    # # options.add_argument("--headless")  # Example: run Opera in headless mode

    # # Initialize the ChromeDriver service
    # service = Service(chrome_driver_path)
    

    # Launch Opera using ChromeDriver
    # driver = webdriver.Chrome(service=service, options=options)

    extractAndUpdateSheet(sheet, start, end, driver)
    # Close the browser
    logger.info("Closing the browser.")
    driver.quit()

import argparse

def main():
    """
    Main entry point for running the data extraction and update process.
    """
    parser = argparse.ArgumentParser(
        description="Extract and update hotel data using GPT and Google Sheets."
    )

    # Arguments for the script
    parser.add_argument(
        "--debugger_address",
        type=str,
        required=True,
        help="Debugger address for the Chrome WebDriver (e.g., '127.0.0.1:9222').",
    )
    parser.add_argument(
        "--start",
        type=int,
        required=True,
        help="Start row index in the Google Sheet (1-based index).",
    )
    parser.add_argument(
        "--end",
        type=int,
        required=True,
        help="End row index in the Google Sheet (1-based index).",
    )
    parser.add_argument(
        "--subsheet",
        type=str,
        required=True,
        help="Subsheet name in the Google Sheet (e.g., 'Sheet1').",
    )

    # Parse the command-line arguments
    args = parser.parse_args()

    # Log the provided arguments
    logger.info(f"Received arguments: {args}")

    try:
        # Call the dataExtractGpt function with provided arguments
        logger.info("Starting the data extraction and update process...")
        dataExtractGpt(
            debugger_address=args.debugger_address,
            start=args.start,
            end=args.end,
            subsheet=args.subsheet,
        )
        logger.info("Process completed successfully.")
    except Exception as e:
        logger.error(f"An error occurred while executing the script: {e}")

if __name__ == "__main__":
    main()