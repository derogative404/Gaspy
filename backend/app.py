# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from api import GaspyApi
import json
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()  # Load environment variables from .env file

@app.route('/api/fuel-prices', methods=['POST'])
def get_fuel_prices():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    latitude = data.get('latitude', "-36.8485")  # Default to Auckland
    longitude = data.get('longitude', "174.7633")  # Default to Auckland
    distance = data.get('distance', "10")

    gaspy_api = GaspyApi(
        username=email,
        password=password,
        distance=distance,
        latitude=latitude,
        longitude=longitude
    )

    if gaspy_api.login():
        prices = gaspy_api.get_prices()
        if prices:
            return jsonify({"success": True, "prices": prices})
        else:
            return jsonify({"success": False, "message": "Failed to retrieve fuel prices."}), 500
    else:
        return jsonify({"success": False, "message": "Login failed. Please check your credentials."}), 401

if __name__ == '__main__':
    app.run(debug=True)