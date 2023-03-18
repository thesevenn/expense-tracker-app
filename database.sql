CREATE DATABASE EXPENSES;
 CREATE TABLE users_table 
    (
        u_id VARCHAR(100) FOREIGN KEY PRIMARY KEY UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        store BOOLEAN,
        joined_at TIMESTAMP NOt NULL
    )
 