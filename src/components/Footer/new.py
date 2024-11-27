import re
new = f"""json
Copy code
{
  "booking": "Yes",
  "contact_info": "For stays less than 90 nights, call +1 617-300-0956 or email [email protected]. For stays 90 nights or longer, email [email protected]."
}"""

match = re.search(r'\{.*\}', new)
if match:
    print(match.group())
