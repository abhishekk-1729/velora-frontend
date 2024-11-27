
import requests
from bs4 import BeautifulSoup
import pandas as pd
import openai
import os

# Set up your OpenAI API key
openai.api_key = "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"

# Define the input file path
input_file = "/Users/abhishekkumar/velora-frontend/vite-project/src/components/Footer/test_leads.xlsx"

# Function to scrape website content
def scrape_website(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, timeout=120)
        print(response)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract text content from the website
        content = soup.get_text(separator="\n", strip=True)
        return content  # Limit to 2000 characters for GPT input
    except Exception as e:
        return f"Error scraping the website: {e}"

# # Function to analyze website using GPT
    

# def analyze(url):
#     prompt = f"""
#     Analyze the website at {url}.

#     1. Determine if this is a hotel website. Respond with "YES" or "NO".
#     2. If this is a hotel website, does it provide booking functionality on its platform? Respond with "YES" or "NO".
#     3. Suggest improvements to the website's usability, functionality, or design in bullet points.

#     Output format:
#     Is Hotel: <YES/NO>
#     Provides Booking: <YES/NO or N/A>
#     Improvements:
#     - Bullet point 1
#     - Bullet point 2
#     """
#     valid_response = False
#     max_attempts = 1
#     attempts = 0
    
#     while not valid_response and attempts < max_attempts:
#         attempts += 1
#         # Call OpenAI to analyze the website
#         response = openai.chat.completions.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": "You are an expert in website analysis. For the following task, you are required to analyze a hotel website and provide the response that whether this website belogs to a hotel or not. And if they provide booking functionality on their websites. And some suggestions"},
#             {"role": "user", "content": prompt}
#         ]
#     )        
#         response_content = response.choices[0].message.content
#         print(response_content)
    
#     return response_content

# analyze("http://1897beekmanhouse.com/")

def analyze_website(row):
    url = row["website"]
    print(f"Analyzing: {url}")
    
    # Scrape content from the website
    scraped_content = scrape_website(url)
    
    # GPT prompt with scraped content
    prompt = f"""
    Analyze the website at {url}. This is the website data: {scraped_content}

    1. Determine if this is a hotel website. Respond with "YES" or "NO".
    2. If this is a hotel website, does it provide booking functionality on its platform? Respond with "YES" or "NO".
    3. Suggest improvements to the website's usability, functionality, or design in bullet points.

    Output format:
    Is Hotel: <YES/NO>
    Provides Booking: <YES/NO or N/A>
    Improvements:
    - Bullet point 1
    - Bullet point 2
    """
    
    # Get GPT response
    try:
        
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert in website analysis. For the following task, you are required to analyze a hotel website."},
                {"role": "user", "content": prompt}
            ]
            # max_tokens=300
        )
        print(response)
        text = response.choices[0].message.content.strip()
        print(text)
        
        # Parse GPT response
        is_hotel = "YES" if "Is Hotel: YES" in text else "NO"
        provides_booking = "YES" if "Provides Booking: YES" in text else "NO" if "Provides Booking: NO" in text else "N/A"
        improvements = text.split("Improvements:")[-1].strip() if "Improvements:" in text else "N/A"
        
        return pd.Series([is_hotel, provides_booking, improvements])
    except Exception as e:
        print(e)
        return pd.Series(["Error", "Error", f"Error generating GPT response: {e}"])

input_dir = os.path.dirname(input_file)
output_file = os.path.join(input_dir, "output_file.xlsx")

data = {
    "website": ["http://apahotelwoodbridge.com/"]
}
df = pd.DataFrame(data)

df = pd.read_excel(input_file)
# Apply the function to each row
df[["Is Hotel", "Provides Booking", "Improvements"]] = df.apply(analyze_website, axis=1)

# Save results to a new Excel file
df.to_excel(output_file, index=False)
print(f"Results saved to {output_file}")

