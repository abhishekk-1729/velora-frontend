import gspread
from oauth2client.service_account import ServiceAccountCredentials
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json
import re
# Setup for Google Sheets API
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name('thefirstweb.json', scope)
client = gspread.authorize(creds)

# Open Google Sheet by name
sheet = client.open("Hotels_review_count_100_1").worksheet("Working3")

# Setup for Selenium WebDriver
options = webdriver.ChromeOptions()
options.debugger_address = "127.0.0.1:9115"  # Specify the debugger address
driver = webdriver.Chrome(options=options)

# time.sleep(10)  # Adjust as necessary

# Function to interact with OpenAI and return JSON response
def get_openai_response(website_url, website_name):
    try:
        driver.get("https://chat.openai.com/")  # Adjust OpenAI URL if needed
        time.sleep(10)  # Adjust as necessary

        # Create the complete prompt as requested
        prompt = f"""
        Browse the given hotel website based on the provided name and URL. website name: {website_name}, website url: {website_url}. Return only a JSON response with the following fields. Ensure the response adheres strictly to the JSON structure, covering all possible edge cases, and use "NA" or "Not Available" where data is missing or inapplicable. Additionally, provide a specific tip to improve each of the following scores: `mobileResponsivenessOutOf10`, `loadingSpeedOutOf10`, `seoOptimizationOutOf10`, `userExperienceOutOf10`, and `bookingFlowOutOf10`. Use an empty string `""` as the tip if the score is perfect (10/10). The fields should include: - `isSiteFunctional` (true/false) - `belongsToThisHotel` (true/false) - `contactNumbers` (array of strings with contact numbers, or use `[]` if not available) - `emails` (array of strings with email addresses, or use `[]` if not available) - `hotelBookingAvailable` (true/false) - `sameDomainBooking` (true/false, whether hotel provides booking on the same domain) - `thirdPartyBookingDomain` (string, the domain used for booking if not on the same domain, or use "NA") - `category` ("hotel", "motel", or "others") - `ifOthersThenWhat` (string, describe the category if `category` is "others", or use "NA") - `mobileResponsivenessOutOf10` (integer, 1-10) - `mobileResponsivenessTip` (string, provide one tip to improve this score) - `loadingSpeedOutOf10` (integer, 1-10) - `loadingSpeedTip` (string, provide one tip to improve this score) - `seoOptimizationOutOf10` (integer, 1-10) - `seoOptimizationTip` (string, provide one tip to improve this score) - `userExperienceOutOf10` (integer, 1-10) - `userExperienceTip` (string, provide one tip to improve this score) - `bookingFlowOutOf10` (integer, 1-10, or use "NA" if not applicable) - `bookingFlowTip` (string, provide one tip to improve this score, or use "NA" if `bookingFlowOutOf10` is "NA") - `tips` (array of strings with general improvement suggestions or use `[]` if none) - `whatThisWebsiteDoesInOneLine` (string summarizing the website purpose, starting with "We found that your website...") Do not include explanations or extra text outside the JSON. Given the website name and URL, return only the JSON output  adhering to the structure and filling in the fields appropriately.
        """
        # Interact with OpenAI input
        input_box = driver.find_element(By.CSS_SELECTOR, "#prompt-textarea p")
        input_box.send_keys(prompt)
        input_box.send_keys(Keys.RETURN)

        time.sleep(20)  # Adjust as necessary

        # Extract and return response
        response = driver.find_element(By.CLASS_NAME, "markdown").text
        cleaned_response = re.sub(r'(?i)json\s*Copy code\s*', '', response)
        # Now, parse the cleaned response string into a JSON object
        response_json = json.loads(cleaned_response)
        return response_json
    except Exception as e:
        print(f"Error: {e}")
        return None

attempts = 3  # Set the number of attempts
# Process each row in the Google Sheet
for i, row in enumerate(sheet.get_all_records(), start=2):  # Assuming data starts from row 2
    website_url = row['website']
    website_name = row['name']
    print(f"Processing {website_name} ({website_url})...")

    response_json = None
    for attempt in range(attempts):
        response_json = get_openai_response(website_url, website_name)
        if response_json:
            break
        else:
            print(f"Attempt {attempt + 1} failed for {website_name} ({website_url})...")

    if response_json:
        # Assuming the JSON has keys for the desired data
        # Example: {"booking": "Yes", "contact_info": "support@website.com", ...}
        sheet.update_cell(i, 3, response_json.get("hotelBookingAvailable", "N/A"))
        contact_numbers = response_json.get("contactNumbers", ["N/A"])
        emails = response_json.get("emails", ["N/A"])
        sheet.update_cell(i, 4, ', '.join(contact_numbers))
        sheet.update_cell(i, 5, ', '.join(emails))       
        sheet.update_cell(i, 6, response_json.get("mobileResponsivenessOutOf10", "N/A"))
        sheet.update_cell(i, 7, response_json.get("mobileResponsivenessTip", ""))
        sheet.update_cell(i, 8, response_json.get("loadingSpeedOutOf10", "N/A"))
        sheet.update_cell(i, 9, response_json.get("loadingSpeedTip", ""))
        sheet.update_cell(i, 10, response_json.get("seoOptimizationOutOf10", "N/A"))
        sheet.update_cell(i, 11, response_json.get("seoOptimizationTip", ""))
        sheet.update_cell(i, 12, response_json.get("userExperienceOutOf10", "N/A"))
        sheet.update_cell(i, 13, response_json.get("userExperienceTip", ""))
        sheet.update_cell(i, 14, response_json.get("bookingFlowOutOf10", "N/A"))
        sheet.update_cell(i, 15, response_json.get("bookingFlowTip", "NA"))
        tips = response_json.get("tips",  ["No tips available"])
        sheet.update_cell(i, 16, ', '.join(tips))
        sheet.update_cell(i, 17, response_json.get("whatThisWebsiteDoesInOneLine", "N/A"))
        sheet.update_cell(i, 18, response_json.get("isSiteFunctional", "N/A"))
        sheet.update_cell(i, 19, response_json.get("belongsToThisHotel", "N/A"))
        sheet.update_cell(i, 20, response_json.get("sameDomainBooking", "N/A"))
        sheet.update_cell(i, 21, response_json.get("thirdPartyBookingDomain", "N/A"))
        sheet.update_cell(i, 22, response_json.get("category", "N/A"))
        sheet.update_cell(i, 23, response_json.get("ifOthersThenWhat", "N/A"))
        # Update columns E, F, G, H similarly as per the JSON structure

        print(f"Updated row {i} with response data.")
    else:
        print(f"Failed to get response for {website_name} ({website_url})")

# Close the browser
driver.quit()

