CREATE DATABASE finances;

 CREATE TABLE users 
    (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        store BOOLEAN DEFAULT FALSE,
        joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE expense(
        id VARCHAR(255) PRIMARY KEY,
        amount NUMERIC(10,3),
        credit BOOLEAN DEFAULT FALSE,
        u_id FOREIGN KEY,
        date DATE DEFAULT DATE,
        time TIMESTAMP,
        FOREIGN KEY (u_id) REFERENCES users(u_id)
    )

    CREATE TABLE summary(
    id VARCHAR(50) PRIMARY KEY,
	expense NUMERIC(10,3),
	earn NUMERIC(10,3),
	u_id VARCHAR(50),
	CONSTRAINT fk_user
	FOREIGN KEY(u_id)
	REFERENCES users(id)
    )

-- create new expense => day 1 to day 30 (1 month) if want month select * from expense where id = "" AND month = may
-- SELECT * from users where EXTRACT(year from users.joined)=2023;
