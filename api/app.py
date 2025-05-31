import os
import psycopg2
from flask import Flask, jsonify, make_response,render_template,jsonify,request,session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from psycopg2.extras import RealDictCursor
from datetime import datetime
from sqlalchemy import text
from collections import defaultdict

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

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    products = db.relationship('Product', backref='category', lazy=True)


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)

class Permission(db.Model):
    __tablename__ = 'permissions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)


@app.route('/users')
def index():
    query = text("""
        SELECT u.id AS user_id, u.username, u.email, u.created_at,
               r.name AS role_name, p.name AS permission_name
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        LEFT JOIN role_permissions rp ON r.id = rp.role_id
        LEFT JOIN permissions p ON rp.permission_id = p.id
        ORDER BY u.id;
    """)

    result = db.session.execute(query).mappings()

    users_dict = {}

    for row in result:
        user_id = row['user_id']
        if user_id not in users_dict:
            users_dict[user_id] = {
                'id': user_id,
                'username': row['username'],
                'email': row['email'],
                'created_at': row['created_at'],
                'roles': defaultdict(list)
            }

        if row['role_name'] and row['permission_name']:
            users_dict[user_id]['roles'][row['role_name']].append(row['permission_name'])

    # Convert defaultdicts to dicts for JSON serialization
    for user in users_dict.values():
        user['roles'] = {role: perms for role, perms in user['roles'].items()}

    return jsonify(list(users_dict.values()))

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([
        {
            'id': category.id,
            'name': category.name
        } for category in categories
    ])

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            'id': product.id,
            'name': product.name,
            'price': float(product.price),
            'category': {
                'id': product.category.id,
                'name': product.category.name
            } if product.category else None
        } for product in products
    ])

@app.route('/category/<int:category_id>', methods=['GET'])
def get_category_with_products(category_id):
    category = Category.query.get(category_id)

    if not category:
        return jsonify({"error": "Category not found"}), 404

    return jsonify({
        "id": category.id,
        "name": category.name,
        "products": [
            {
                "id": product.id,
                "name": product.name,
                "price": float(product.price)
            } for product in category.products
        ]
    })

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
    
    data = request.get_json()

    new_user = User(
    username=data.get("username"),
    email=data.get("email"),
    password=data.get("password")
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

        # SQL query to fetch roles and permissions for the user
        query = text("""
            SELECT r.name AS role_name, p.name AS permission_name
            FROM users u
            JOIN user_roles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            JOIN role_permissions rp ON r.id = rp.role_id
            JOIN permissions p ON rp.permission_id = p.id
            WHERE u.id = :user_id
        """)
        result = db.session.execute(query, {'user_id': user.id}).mappings().all()

        first_row = result[0]
        user_info = {first_row}
        user_info = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at,
            "roles": {},
            "permissions":{}
        }

        roles = set()
        permissions = set()

        for row in result:
            roles.add(row["role_name"])
            permissions.add(row["permission_name"])
        user_info["roles"] = list(roles)
        user_info["permissions"] = list(permissions)

        return jsonify(user_info)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/edit-user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "password": user.password
    })

@app.route('/edit-user', methods=['POST'])
def update_user():
    
    data = request.get_json()
    user_id = data.get("id")
    user = User.query.get(user_id)

    user.username = data.get("username")
    user.email = data.get("email")
    user.password = data.get("password")

    try:
        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500  # Return the actual error message here  

@app.route('/delete-user', methods=['POST'])
def delete_user():
    data = request.get_json()
    user_id = data.get("id")
    user = User.query.get(user_id)

    if not user_id:
        return jsonify({"error": "No user ID provided"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": f"User {user_id} deleted successfully","id": user_id})

@app.route('/add-role', methods=['POST'])
def create_role():
    
    data = request.get_json()

#     new_user = User(
#     username=data.get("username"),
#     email=data.get("email"),
#     password=data.get("password")
# )

#     try:
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify({'message': 'User created', 'user': {'email': new_user.email}}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 400

@app.route('/roles', methods=['GET'])
def get_roles():
    query = text("""select r.id as role_id, r.name as role_name,r.description as role_description,p.id as permission_id, p.name as permission_name from roles r join role_permissions pr on r.id = pr.role_id join permissions p on p.id = pr.permission_id""")
    result = db.session.execute(query).mappings()

    roles_dict = defaultdict(lambda: {'id': None, 'name': '', 'description': '', 'permissions': []})

    for row in result:
        role_id = row['role_id']
        if roles_dict[role_id]['id'] is None:
            roles_dict[role_id].update({
                'id': role_id,
                'name': row['role_name'],
                'description': row['role_description'],
                'permissions': []
            })
        roles_dict[role_id]['permissions'].append({
            'id': row['permission_id'],
            'name': row['permission_name']
        })

    return jsonify(list(roles_dict.values()))

@app.route('/edit-role/<int:role_id>', methods=['GET'])
def get_role(role_id):
    role = Role.query.get(role_id)

    if not role:
        return jsonify({"error": "Role not found"}), 404

    return jsonify({
        "id": role.id,
        "name": role.name,
        "description": role.description,

    })

@app.route('/edit-role', methods=['POST'])
def update_role():
    
    data = request.get_json()
    role_id = data.get("id")
    role = Role.query.get(role_id)

    role.name = data.get("username")
    role.decription = data.get("email")
    role.permissions = data.get("password")

    try:
        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500  # Return the actual error message here   

@app.route('/delete-role', methods=['POST'])
def delete_role():
    data = request.get_json()
    role_id = data.get("id")
    role = Role.query.get(role_id)

    if not role_id:
        return jsonify({"error": "No user ID provided"}), 400

    role = Role.query.get(role_id)

    if not role:
        return jsonify({"error": "Role not found"}), 404

    db.session.delete(role)
    db.session.commit()

    return jsonify({"message": f"Role {role_id} deleted successfully","id": role_id})

    if not role_id:
        return jsonify({"error": "No user ID provided"}), 400

    role = Role.query.get(role_id)

    if not role:
        return jsonify({"error": "Role not found"}), 404

    db.session.delete(role)
    db.session.commit()

    return jsonify({"message": f"Role {role_id} deleted successfully","id": role_id})


@app.route('/edit-permission/<int:permission_id>', methods=['GET'])
def get_permission(permission_id):
    permission = Permission.query.get(permission_id)

    if not permission:
        return jsonify({"error": "Role not found"}), 404

    return jsonify({
        "id": permission.id,
        "name": permission.name,
        "description": permission.description,

    })
@app.route('/permissions', methods=['GET'])
def get_permissions():
    permissions = Permission.query.all()
    return jsonify([
        {
            'id': permission.id,
            'name': permission.name,
            'description': permission.description

        } for permission in permissions
    ])

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out"})


@app.route('/check-login')
def checkLogin():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"loggedIn": False, "user": {}})

    # One query to fetch user info + roles + permissions
    query = text("""
        SELECT u.id, u.username, u.email, u.created_at,
               r.name AS role_name, p.name AS permission_name
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = :user_id
    """)

    result = db.session.execute(query, {'user_id': user_id}).mappings().all()

    if not result:
        return jsonify({"loggedIn": False, "user": {}})

    # Get user info from first row
    first_row = result[0]
    user_info = {
        "id": first_row["id"],
        "username": first_row["username"],
        "email": first_row["email"],
        "created_at": first_row["created_at"],
        "roles": {},
        "permissions":{}
    }

    # Collect roles and permissions
    roles = set()
    permissions = set()

    for row in result:
        roles.add(row["role_name"])
        permissions.add(row["permission_name"])
    user_info["roles"] = list(roles)
    user_info["permissions"] = list(permissions)

    return jsonify({
        "loggedIn": True,
        "user": user_info
    })
 
if __name__ == '__main__':
    app.run(debug=True)