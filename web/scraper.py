# Install these libraries first if you haven't:
# pip install requests beautifulsoup4

import requests
from bs4 import BeautifulSoup

# Step 1: Define the URL of the website to scrape
url = 'https://en.wikipedia.org/wiki/Wikipedia'  # Replace with the website you want to scrape

# Step 2: Send a GET request to the URL
response = requests.get(url)

# Step 3: Check if the request was successful
if response.status_code == 200:
    # Step 4: Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Step 5: Extract and print all text content
    print(soup.get_text())
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
su