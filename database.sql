CREATE DATABASE expenses;

 CREATE TABLE users 
    (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        store BOOLEAN,
        joined_at TIMESTAMP
    )

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

    CREATE TABLE month(
        month_name VARCHAR(40),
        month_id SERIAL SMALLINT,
        expense NUMERIC(10,3),
        earn NUMERIC(10,3),
        avg NUMERIC(10,3),
        u_id VARCHAR(100),
        CONSTRAINT fk_user
      FOREIGN KEY(u_id) 
	  REFERENCES users(id)
    )

    CREATE TABLE year(
        year_name VARCHAR(40),
        year_id SERIAL BIGINT,
        expense NUMERIC(10,3),
        earn NUMERIC(10,3),
        avg NUMERIC(10,3),
        u_id FOREIGN KEY
    )
 
 