import json
import os

#Saving to JSON file
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data.json')

def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def write_data(data):
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
    except TypeError as e:
        print(f"Error writing JSON data: {e}")

