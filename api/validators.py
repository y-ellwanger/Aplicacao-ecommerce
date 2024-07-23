import re

def username_verification(username):
    return re.match("^[a-zA-Z0-9]{4,15}$", username) is not None

def password_verification(password):
    return len(password)>=6

def email_verification(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None