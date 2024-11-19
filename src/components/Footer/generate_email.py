# from bs4 import BeautifulSoup
import requests
import re
import openai
import random
from jinja2 import Template
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


# Email configuration
SMTP_SERVER = 'smtp.gmail.com'  # Replace with your SMTP server
SMTP_PORT = 587  # Common port for TLS
EMAIL_ADDRESS = 'abhishek@thefirstweb.com'  # Replace with your email
EMAIL_PASSWORD = 'ojli raor eeqr amdk'  # Replace with your app-specific password or email password
# openai.api_key = "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"
openai.api_key = "key"
# 1. Extract Emails
def extract_emails(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text()
    emails = set(re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text))
    return list(emails)

# 2. Validate Emails
def validate_email(email):
    return True if '@' in email and '.' in email else False

def get_website_metrics(url):
    metrics_to_check = [
        "Mobile Optimization",
        "Loading Speed",
        "SEO Ranking",
        "User Experience",
        "Booking Flow"
    ]
    
    valid_response = False
    max_attempts = 5
    attempts = 0
    
    while not valid_response and attempts < max_attempts:
        attempts += 1
        # Call OpenAI to analyze the website
        response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are an expert in website analysis. For the following task, you are required to analyze a hotel website and provide scores for the following metrics: Mobile Optimization, Loading Speed, SEO Ranking, User Experience, and Booking Flow. Your response must ONLY include these 5 metrics in this exact format: [Website Description: 'Short one-line description about what this website does starting as- I found that your website ...', Metric Name: 'Mobile Optimization', Your Score: X, Competitor Score: Y, Improvement Suggestion: 'Short one-line improvement with a numeric benefit']. Do not include any other text, explanation, or details."},
        {"role": "user", "content": f"Analyze the website {url} and provide scores for the five metrics listed in the prompt. Include Website Description every time while providing the scores"}
    ]
)        
        response_content = response.choices[0].message.content
        print(response_content)
        metrics = parse_metrics_response(response_content)
        print("metrics")
        print(metrics)
        if metrics and len(metrics) == len(metrics_to_check):
            valid_response = True
    
    if not valid_response:
        return None
    
    return metrics

# Function to parse OpenAI response into a structured list of metrics
def parse_metrics_response(response_content):
    metrics = []
    lines = response_content.split("\n")
    print(lines)
    
    for line in lines:
        # Remove surrounding brackets and strip whitespace
        line = line.strip().strip("[]")
        print(line)
        
        if line:
            try:
                # Split the line into individual key-value pairs
                metric_info = {}
                parts = line.split(", ")
                print(parts)
                
                for part in parts:
                    print(part)
                    key, value = part.split(": ", 1)
                    print(key)
                    print(value)
                    key = key.strip()  # Remove any leading/trailing whitespace
                    value = value.strip().strip("'")  # Remove leading/trailing whitespace and quotes
                    # print(value)
                    # Convert numeric values to integers if needed
                    if value.isdigit():
                        value = int(value)
                    elif value.replace('.', '', 1).isdigit() and value.count('.') < 2:
                        value = float(value)
                    
                    metric_info[key] = value
                
                # Append the parsed metric information as a tuple
                metrics.append((
                    metric_info['Website Description'],
                    metric_info['Metric Name'],
                    metric_info['Your Score'],
                    metric_info['Competitor Score'],
                    metric_info['Improvement Suggestion']
                ))
            except (ValueError, KeyError):
                # Skip lines that don't match the expected format or cause parsing errors
                continue
    
    return metrics

def generate_email(hotel_name, hotel_website, metrics):
    subject = "Get More Bookings: 5 Quick Fixes for Your Website"
    
    # Load the email template from the HTML file
    with open("email2.html", "r") as file:
        email_template = file.read()

    # Create a Jinja2 template from the loaded HTML
    template = Template(email_template)

    # Render the template with the provided data
    email_body = template.render(
        # hotel_name=hotel_name,
        # hotel_website=hotel_website,
        # metrics=metrics
    )
    
    return subject, email_body
# Example Usage
url = "https://www.carltonarms.com/"
# emails = extract_emails(url)
# print(emails)
# validated_emails = [email for email in emails if validate_email(email)]
# issues = identify_website_issues(url)
# metrics = get_website_metrics(url)
subject, email_content = generate_email("Hotel Owner", url, "metrics")
# print(email_content)
to_email = "abhikriitd@gmail.com"
# send an email from support@thefirstweb.com to abhikriitd@gmail with these subject and html email content

def send_email(to_email, subject, html_content):
    print(html_content)
    # Create the email
    msg = MIMEMultipart()
    msg['From'] = f"{'Abhishek'} <{EMAIL_ADDRESS}>"
    msg['To'] = to_email
    msg['Subject'] = subject
    
    # Attach the HTML content
    msg.attach(MIMEText(html_content, 'html'))

    
    # Send the email
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            print("Email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")

send_email(to_email, "Abhishek, is this your website?", email_content)
