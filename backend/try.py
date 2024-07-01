from api import GaspyApi
import json
from dotenv import load_dotenv
import os

# Initialize the GaspyApi with your credentials and location
gaspy_api = GaspyApi(
    username=os.getenv('EMAIL'),
    password=os.getenv('PASSWORD'),
    distance="10",  # Search radius in kilometers
    latitude="-36.8485",  # Example latitude for Auckland
    longitude="174.7633"  # Example longitude for Auckland
)

# Login to the service
if gaspy_api.login():
    # If login is successful, get the prices
    prices = gaspy_api.get_prices()
    if prices:
        print("Fuel prices retrieved successfully:")
        filename = f"fuel_prices.json"
        with open(filename, 'w') as json_file:
            json.dump(prices, json_file, indent=2)
    else:
        print("Failed to retrieve fuel prices.")
else:
    print("Login failed. Please check your credentials.")