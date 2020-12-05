CREATE SCHEMA falseLia

 CREATE TABLE listings (
    listing_id INT PRIMARY KEY,
    sale BOOL,
    pending BOOL,
    new BOOL,
    construction BOOL,
    address VARCHAR (80) NOT NULL,
    price NUMERIC NOT NULL,
    bed SMALLINT NOT NULL,
    bath SMALLINT NOT NULL,
    images TEXT [] NOT NULL,
    UNIQUE(address)
    )

  CREATE TABLE users (
    user_id INT PRIMARY KEY,
    location VARCHAR (80) NOT NULL,
    name VARCHAR (80) NOT NULL,
    email VARCHAR (80) NOT NULL,
    phoneNumber VARCHAR (10),
    userType VARCHAR (12) NOT NULL,
    searches TEXT [],
    UNIQUE(name, email)
    )

  CREATE TABLE paymentInfo (
    id SERIAL PRIMARY KEY,
    user_id INT,
    ccNumber VARCHAR (19),
    ccName VARCHAR (80),
    ccAddress VARCHAR (80),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )

  CREATE TABLE favorites (
    user_id int NOT NULL,
    listing_id int NOT NULL,
    PRIMARY KEY (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON UPDATE CASCADE
);