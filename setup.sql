DROP TABLE operations;
DROP TABLE accounts;
DROP TABLE profiles;
DROP TABLE users;

CREATE TABLE users(
id SERIAL,
username VARCHAR PRIMARY KEY NOT NULL,
password VARCHAR NOT NULL
);

CREATE TABLE profiles(
    profile_id serial PRIMARY KEY,
    username VARCHAR REFERENCES users(username)
);

CREATE TABLE accounts(
    account_id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profiles(profile_id),
    type VARCHAR NOT NULL,
    amount NUMERIC(10,2) NOT NULL
);

CREATE TABLE operations(
operation_id SERIAL PRIMARY KEY,
date DATE NOT NULL,
account_id_from INT REFERENCES accounts(account_id) NOT NULL,
account_id_to INT REFERENCES accounts(account_id) NOT NULL,
username_from VARCHAR NOT NULL,
username_to VARCHAR NOT NULL,
type VARCHAR NOT NULL,
amount NUMERIC(10,2) NOT NULL
);

INSERT INTO users(username, password)
VALUES
('mike','$2b$05$ujUE0AxSnPnLmPCVNQhpYeCUvRhNGBGlDU2fAB7FEaXCefWb67h86'),
('shop123','$2b$05$sPKCPDVyMoLn5AsMec2cNODtrAXeL1bURotRQZaG78E/M6ATKDpD6'),
('pharmacy123','$2b$05$maMcoeB1dcXYK68yZPAS9O9n3aMN0wMYlSTxS7AbPVeyumHhtUThi'),
('vlad','$2b$05$nQvESpClu.4M1HV7/TClfOjP0LpHd2jgGWVbxuknz3KSddiY9Zb.2');

INSERT INTO PROFILES(username)
VALUES
('mike'),
('shop123'),
('pharmacy123'),
('vlad');

INSERT INTO accounts(profile_id, type, amount)
VALUES
(1, 'USD', 10000.0),
(1, 'ILS', 10000.0),
(2, 'USD', 0.0),
(3, 'USD', 0.0),
(4, 'USD', 10000.0),
(4, 'ILS', 10000.0);

INSERT INTO operations (date, account_id_from, account_id_to,username_from, username_to, type, amount)
VALUES 
('2023-10-01', 1, 2, 'mike', 'shop123', 'USD', 43),
('2023-09-21', 1, 2, 'mike', 'shop123', 'USD', 20),
('2023-09-21', 1, 3, 'mike', 'pharmacy123', 'ILS', 5),
('2023-08-12', 1, 3, 'mike', 'pharmacy123', 'ILS', 150),
('2023-07-11', 1, 3, 'mike', 'pharmacy123', 'ILS', 500),
('2023-07-05', 1, 3, 'mike', 'pharmacy123', 'ILS', 425),
('2023-06-01', 1, 3, 'mike', 'pharmacy123', 'ILS', 330),
('2023-05-20', 1, 2, 'mike', 'shop123', 'USD', 43),
('2023-05-19', 1, 2, 'mike', 'shop123', 'USD', 20),
('2023-05-18', 1, 3, 'mike', 'pharmacy123', 'ILS', 5),
('2023-04-18', 1, 3, 'mike', 'pharmacy123', 'ILS', 150),
('2023-04-11', 1, 3, 'mike', 'pharmacy123', 'ILS', 500),
('2023-03-05', 1, 4, 'mike', 'vlad', 'ILS', 425),
('2023-02-01', 1, 4, 'mike', 'vlad', 'ILS', 330),
('2023-04-18', 1, 4, 'mike', 'vlad', 'ILS', 150),
('2023-04-11', 4, 1, 'vlad', 'mike', 'ILS', 500),
('2023-03-05', 4, 1, 'vlad', 'mike', 'ILS', 425),
('2023-02-01', 4, 1, 'vlad', 'mike', 'ILS', 330);
