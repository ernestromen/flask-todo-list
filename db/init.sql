CREATE DATABASE task_management;

\c task_management;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert sample data
INSERT INTO users (username, email, password)
VALUES
    ('admin', 'admin@example.com', 'hashedpassword'),
    ('jane', 'jane@example.com', 'hashedpassword');
