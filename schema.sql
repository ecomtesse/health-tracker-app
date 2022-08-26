DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS height CASCADE;
DROP TABLE IF EXISTS weight CASCADE;
DROP TABLE IF EXISTS bmi CASCADE;
DROP TABLE IF EXISTS heart_rate CASCADE;
DROP TABLE IF EXISTS blood_pressure CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  surname TEXT,
  email TEXT
);

CREATE TABLE height(
  id SERIAL PRIMARY KEY,
  height INT NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE weight(
  id SERIAL PRIMARY KEY,
  weight DECIMAL NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE bmi(
  id SERIAL PRIMARY KEY,
  bmi INT NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE heart_rate(
  id SERIAL PRIMARY KEY,
  heart_rate INT NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE blood_pressure(
  id SERIAL PRIMARY KEY,
  systolic_bp INT NOT NULL,
  diastolic_bp INT NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE
);