import os
from bs4 import BeautifulSoup

link_map = {
    'home': 'index.html',
    'listings': 'listings.html',
    'property details': 'property.html',
    'details': 'property.html',
    'about us': 'about.html',
    'about': 'about.html',
    'testimonials': 'testimonials.html',
    'contact': 'contact.html',
    'contact us': 'contact.html',
}

public_dir = 'public'

for filename in os.listdir(public_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(public_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
        changed = False
        
        # Find all a and div elements that might be navigation links
        for tag in soup.find_all(['a', 'div']):
            if tag.string:
                text = tag.string.strip().lower()
                if text in link_map:
                    target = link_map[text]
                    if tag.name == 'a':
                        if tag.get('href') != target:
                            tag['href'] = target
                            changed = True
                    elif tag.name == 'div':
                        # Convert div to a tag
                        tag.name = 'a'
                        tag['href'] = target
                        changed = True

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print(f"Updated {filename}")
