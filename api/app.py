from flask import Flask, request, session, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson.objectid import ObjectId
import configparser

Config = configparser.ConfigParser()
Config.read("config.ini")
client_address = Config["Database"]["client_address"]
db_name = Config["Database"]["db_name"]
collection_name = Config["Database"]["collection_name"]

client = MongoClient(client_address)
db = client[db_name]
collection = db[collection_name]

app = Flask(__name__)
app.secret_key= "chave fodastica"
CORS(app)
bcrypt = Bcrypt(app)

@app.route("/")
def home():
    return "PyFlask API"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if data["password"] != None and data["username"]!=None:
        if  len(collection.find({"username": data["username"]}))==0:
            try:
                data["password"] = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
                collection.insert_one(data)
                return True
            except Exception as err:
                return err
    return False

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if data["password"] and data["username"]:
        user = collection.find_one({"username": data["username"]})
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
    else: return jsonify({"message": "User was not logged in"}), 401


if __name__ == "__main__":
    app.run(debug=True)