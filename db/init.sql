-- Create the database
CREATE DATABASE task_management;

-- Connect to the database
\c task_management;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (username, email, password)
VALUES
    ('admin', 'admin@example.com', 'hashedpassword'),
    ('jerry', 'jerry@example.com', 'hashedpassword'),
    ('jane', 'jane@example.com', 'hashedpassword');


-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Insert sample categories
INSERT INTO categories (name, description)
VALUES
    ('Electronics', 'Devices and gadgets'),
    ('Books', 'Various kinds of books'),
    ('Clothing', 'Apparel and garments');

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, description, price, category_id)
VALUES
    ('Smartphone', 'Latest model smartphone', 699.99, 1),
    ('Laptop', 'High performance laptop', 1299.99, 1),
    ('Fiction Book', 'Bestselling fiction book', 19.99, 2),
    ('T-Shirt', '100% cotton t-shirt', 14.99, 3);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Insert sample roles
INSERT INTO roles (name, description) VALUES
    ('Admin', 'Full access to all system features'),
    ('Editor', 'Can edit content but not manage users'),
    ('Viewer', 'Read-only access');

-- Create pivot table for users and roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

-- Assign Editor role to 'jerry'
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);

-- Assign Viewer role to 'jane'
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3);

CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Insert sample permissions
INSERT INTO permissions (name, description) VALUES
    ('view_users', 'Can view user list'),
    ('edit_users', 'Can edit users'),
    ('delete_users', 'Can delete users'),
    ('manage_roles', 'Can assign roles and permissions'),
    ('view_products', 'Can view products'),
    ('edit_products', 'Can edit products'),
    ('delete_products', 'Can delete products');

-- Create role_permissions join table
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Assign permissions to roles (sample data)
-- Admin gets all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;


-- Editor can view and edit products, view users
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions WHERE name IN ('view_users', 'view_products', 'edit_products');


-- Viewer can only view users and products
INSERT INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions WHERE name IN ('view_users', 'view_products');