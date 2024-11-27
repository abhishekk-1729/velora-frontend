from bs4 import BeautifulSoup
import requests

def scrape_all_pages(base_url):
    visited = set()
    all_content = []

    def scrape_page(url):
        if url in visited:
            return
        print(url)
        print("****************************************\n")

        try:
            visited.add(url)
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            response = requests.get(url, headers=headers, timeout=120)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Extract text content
            content = soup.get_text(separator="\n", strip=True)
            print(content)
            all_content.append(content[:2000])  # Limit for demonstration
            
            # Find and visit links
            for a_tag in soup.find_all("a", href=True):
                full_url = requests.compat.urljoin(base_url, a_tag["href"])
                if full_url.startswith(base_url):
                    scrape_page(full_url)
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    scrape_page(base_url)
    # print(all_content)
    return all_content

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
        print(content)
        return content[:2000]  # Limit to 2000 characters for GPT input
    except Exception as e:
        return f"Error scraping the website: {e}"

# scrape_website("http://cavemountainmotel.com/")
# Example usage
website_content = scrape_all_pages("http://bridgeviewmotel.net/")
