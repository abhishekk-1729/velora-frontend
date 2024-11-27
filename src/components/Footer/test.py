website_name = "a"
website_url = "a"
prompt = f"""
Browse the given hotel website based on the provided name and URL. website name: {website_name}, website url: {website_url}. Return only a JSON response with the following fields. Ensure the response adheres strictly to the JSON structure, covering all possible edge cases, and use "NA" or "Not Available" where data is missing or inapplicable. Additionally, provide a specific tip to improve each of the following scores: `mobileResponsivenessOutOf10`, `loadingSpeedOutOf10`, `seoOptimizationOutOf10`, `userExperienceOutOf10`, and `bookingFlowOutOf10`. Use an empty string `""` as the tip if the score is perfect (10/10).
""" 
instructions =  """
    The fields should include:
    - `isSiteFunctional` (true/false)
    - `belongsToThisHotel` (true/false)
    - `contactNumbers` (array of strings with contact numbers, or use `[]` if not available)
    - `emails` (array of strings with email addresses, or use `[]` if not available)
    - `hotelBookingAvailable` (true/false)
    - `sameDomainBooking` (true/false, whether hotel provides booking on the same domain)
    - `thirdPartyBookingDomain` (string, the domain used for booking if not on the same domain, or use "NA")
    - `category` ("hotel", "motel", or "others")
    - `ifOthersThenWhat` (string, describe the category if `category` is "others", or use "NA")
    - `mobileResponsivenessOutOf10` (integer, 1-10)
    - `mobileResponsivenessTip` (string, provide one tip to improve this score)
    - `loadingSpeedOutOf10` (integer, 1-10)
    - `loadingSpeedTip` (string, provide one tip to improve this score)
    - `seoOptimizationOutOf10` (integer, 1-10)
    - `seoOptimizationTip` (string, provide one tip to improve this score)
    - `userExperienceOutOf10` (integer, 1-10)
    - `userExperienceTip` (string, provide one tip to improve this score)
    - `bookingFlowOutOf10` (integer, 1-10, or use "NA" if not applicable)
    - `bookingFlowTip` (string, provide one tip to improve this score, or use "NA" if `bookingFlowOutOf10` is "NA")
    - `tips` (array of strings with general improvement suggestions or use `[]` if none)
    - `whatThisWebsiteDoesInOneLine` (string summarizing the website purpose, starting with "We found that your website...")

    Do not include explanations or extra text outside the JSON. Here's an example structure:
    ```json
    {{
    "isSiteFunctional": "true",
    "belongsToThisHotel": "true",
    "contactNumbers": ["123-456-7890", "987-654-3210"],
    "emails": ["info@example.com", "contact@example.com"],
    "hotelBookingAvailable": "true",
    "sameDomainBooking": "false",
    "thirdPartyBookingDomain": "booking.com",
    "category": "hotel",
    "ifOthersThenWhat": "NA",
    "mobileResponsivenessOutOf10": 8,
    "mobileResponsivenessTip": "Optimize touch targets and font sizes for smaller screens.",
    "loadingSpeedOutOf10": 7,
    "loadingSpeedTip": "Compress images and leverage browser caching.",
    "seoOptimizationOutOf10": 6,
    "seoOptimizationTip": "Add meta tags and improve keyword targeting.",
    "userExperienceOutOf10": 8,
    "userExperienceTip": "Simplify navigation menus for easier usability.",
    "bookingFlowOutOf10": "NA",
    "bookingFlowTip": "NA",
    "tips": ["Improve page loading speed", "Enhance mobile UI"],
    "whatThisWebsiteDoesInOneLine": "We found that your website offers hotel booking services and provides detailed information about accommodations."
    }}
    ```
    Given the website name and URL, return only the JSON output above, adhering to the structure and filling in the fields appropriately.
"""

print(prompt+instructions)
