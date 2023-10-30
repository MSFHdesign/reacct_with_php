-- Active: 1693467841213@@mysql29.unoeuro.com@3306@siindevelopment_dk_db
-- Drop den eksisterende tabel, hvis den findes

DROP TABLE IF EXISTS users;

-- Opret en ny "users" tabel

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

DROP TABLE IF EXISTS sessions;
    CREATE TABLE sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
