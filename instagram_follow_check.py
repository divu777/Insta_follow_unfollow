from bs4 import BeautifulSoup

# Load your HTML files
with open('followers.html', 'r', encoding='utf-8') as file:
    followers_html = file.read()

with open('following.html', 'r', encoding='utf-8') as file:
    following_html = file.read()

# Parse the HTML
followers_soup = BeautifulSoup(followers_html, 'html.parser')
following_soup = BeautifulSoup(following_html, 'html.parser')

# Extract the list of followers
followers = {user.text.strip(): user['href'] for user in followers_soup.find_all('a', href=True)}
# Extract the list of following
following = {user.text.strip(): user['href'] for user in following_soup.find_all('a', href=True)}

# Find users you are following but who don't follow you back
not_following_back = {user: url for user, url in following.items() if user not in followers}

# Print the result
print("Not following back:")
for user, url in not_following_back.items():
    print(f"{user}: {url}")
