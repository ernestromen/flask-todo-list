import os
import psycopg2
from flask import Flask, jsonify, make_response,render_template,jsonify,request,session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from psycopg2.extras import RealDictCursor
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_super_secret_key'
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# CORS(app)

class Base(DeclarativeBase):
    pass

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:postgres@db:5432/task_management"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))
    email = db.Column(db.String(120))
    password = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/users')
def index():
    users = User.query.all()

    users_list = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at
        } for user in users
    ]
    return jsonify(users_list)

# @app.route('/user/<int:id>')
# def getUserById():




@app.route('/api/v1.0/test', methods=['GET'])
def test_response():
    """Return a sample JSON response."""
    sample_response = {
        "items": [
            { "id": 1, "name": "Apples",  "price": "$2" },
            { "id": 2, "name": "Peaches", "price": "$5" }
        ]
    }
    response = make_response(jsonify(sample_response))

    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'


    return response

@app.route('/add-user', methods=['POST'])
def create_user():
    
    print('sup bitch')
    data = request.get_json()

    new_user = User(
    username=data.get("username"),
    email=data.get("email"),
    password=data.get("password")  # Reminder: hash this in real apps!
)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created', 'user': {'email': new_user.email}}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email=data.get("email"),
    password=data.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        session['user_id'] = user.id
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at
        })
    else:
        return jsonify({"error": "User not found"}), 404
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out"})


@app.route('/check-login')
def checkLogin():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify({"loggedIn": True, "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username
                }})

    return jsonify({"loggedIn": False,"user":{}})


if __name__ == '__main__':
    app.run(debug=True)