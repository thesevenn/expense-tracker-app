CREATE DATABASE finances;

 CREATE TABLE users 
    (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(50) NOT NULL,
        store BOOLEAN DEFAULT FALSE,
        joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

        CREATE TABLE records(
            id VARCHAR(100) PRIMARY KEY,
            amount NUMERIC(10,3) NOT NULL,
            credit BOOLEAN DEFAULT FALSE,
            u_id VARCHAR(100),
            time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_u_id 
                FOREIGN KEY(u_id) 
                    REFERENCES users(id)
                        ON DELETE CASCADE
        );

    CREATE TABLE summary(
       id VARCHAR(100) PRIMARY KEY,
	   debited NUMERIC(10,2),
	   credited NUMERIC(10,2), 
       last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	   u_id VARCHAR(100),
	   CONSTRAINT fk_u_id 
                FOREIGN KEY(u_id) 
                    REFERENCES users(id)
                        ON DELETE CASCADE
    )

-- create new expense => day 1 to day 30 (1 month) if want month select * from expense where id = "" AND month = may
-- SELECT * from users where EXTRACT(year from users.joined)=2023;
