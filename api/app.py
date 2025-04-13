import os
import psycopg2
from flask import Flask, jsonify, make_response


app = Flask(__name__)

def get_db_connection():
    con = psycopg2.connect(host='db',database='task_management',user=os.environ['DB_USERNAME'],password=os.environ['DB_PASSWORD'])
    return con
 

@app.route('/users')
 
def index():
    # return "Hello from /users!"

    conn = get_db_connection()
 

    cur = conn.cursor()
 

    cur.execute('SELECT * FROM users;')
 

    books = cur.fetchall()
 

    cur.close()
 

    conn.close()
 

    return render_template('index.html', books=books)

@app.route('/api/v1.0/test', methods=['GET'])
def test_response():
    """Return a sample JSON response."""
    sample_response = {
        "items": [
            { "id": 1, "name": "Apples",  "price": "$2" },
            { "id": 2, "name": "Peaches", "price": "$5" }
        ]
    }
    # JSONify response
    response = make_response(jsonify(sample_response))

    # Add Access-Control-Allow-Origin header to allow cross-site request
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'

    # Mozilla provides good references for Access Control at:
    # https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    # https://developer.mozilla.org/en-US/docs/Web/HTTP/Server-Side_Access_Control

    return response
