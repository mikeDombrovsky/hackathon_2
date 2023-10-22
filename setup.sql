DROP TABLE operations;
DROP TABLE accounts;
DROP TABLE profiles;
DROP TABLE users;

CREATE TABLE users IF NOT EXISTS(
id SERIAL,
username VARCHAR PRIMARY KEY NOT NULL,
password VARCHAR NOT NULL
);

CREATE TABLE profiles IF NOT EXISTS(
    profile_id serial PRIMARY KEY,
    username VARCHAR REFERENCES users(username)
);

CREATE TABLE accounts IF NOT EXISTS(
    account_id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profiles(profile_id),
    type VARCHAR NOT NULL,
    amount NUMERIC(10,2) NOT NULL
);

CREATE TABLE operations IF NOT EXISTS(
operation_id SERIAL PRIMARY KEY,
date DATE NOT NULL,
account_id_from INT REFERENCES accounts(account_id) NOT NULL,
account_id_to INT REFERENCES accounts(account_id) NOT NULL,
username_to VARCHAR NOT NULL,
type VARCHAR NOT NULL,
amount NUMERIC(10,2) NOT NULL
);