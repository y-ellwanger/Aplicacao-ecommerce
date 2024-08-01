from flask import Flask, request, session, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson.objectid import ObjectId
from validators import *
import configparser

Config = configparser.ConfigParser()
Config.read("config.ini")
client_address = Config["Database"]["client_address"]
db_name = Config["Database"]["db_name"]
user_collection_name = Config["Database"]["user_collection_name"]

client = MongoClient(client_address)
db = client[db_name]
user_collection = db[user_collection_name]

app = Flask(__name__)
app.secret_key= "chave secreta"
CORS(app)
bcrypt = Bcrypt(app)

@app.route("/")
def home():
    return "Backend PyFlask API, used to manage the Mongo database operations"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if set(data.keys()) - ALLOWED_USER_FIELDS:
        return jsonify({"message": "Extra fields not allowed"}), 400
    if data["password"] and data["username"] and data["email"]:
        if not username_verification(data["username"]):
            return jsonify({"message": "Invalid username given"}), 400
        if not password_verification(data["password"]):
            return jsonify({"message": "Invalid password given"}), 400
        if not email_verification(data["email"]):
            return jsonify({"message": "Invalid email given"}), 400
        if user_collection.count_documents({"username": data["username"]})==0:
            try:
                data["password"] = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
                data["orders"] = []
                data["user_type"] = "user"
                user_collection.insert_one(data)
                return jsonify({"message": "User registered successfully"}), 200
            except Exception as error:
                return jsonify({"message": f"Could not connect to the database: {str(error)}"}), 500
        else: return jsonify({"message": "This username already exists"}), 409
    else: return jsonify({"message": "User information required"}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if data["password"] and data["username"]:
        user = user_collection.find_one({"username": data["username"]})
        if user:
            if bcrypt.check_password_hash(user["password"], data["password"]):
                session["user_id"] = str(user["_id"])
                return jsonify({"message": "Login successful"}), 200
            else: return jsonify({"message": "Invalid username or password"}), 401
        else: return jsonify({"message": "User does not exist"}), 400
    else: return jsonify({"message": "Username and password required"}), 400

@app.route("/logout")
def logout():
    if "user_id" in session:
        session.pop("user_id",None)
        return jsonify({"message": "Logout successful"}), 200
    else: 
        return jsonify({"message": "User was not logged in"}), 401

@app.route("/check_session")
def check_session():
    if "user_id" in session:
        return jsonify({"message": "User is logged in"}), 200
    else: return jsonify({"message": "User is not logged in"}), 401

if __name__ == "__main__":
    app.run(debug=True)