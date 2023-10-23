-- Active: 1696918485589@@mysql29.unoeuro.com@3306@siindevelopment_dk_db
CREATE TABLE
    tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );