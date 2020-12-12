DROP SCHEMA IF EXISTS falselia CASCADE;

CREATE SCHEMA falselia;

SET
  search_path TO falselia,
  public;

CREATE TABLE falselia.users (
  user_id INT PRIMARY KEY,
  name VARCHAR (80) NOT NULL,
  email VARCHAR (80) NOT NULL,
  phoneNumber VARCHAR (10),
  location VARCHAR (80) NOT NULL,
  userType VARCHAR (12) NOT NULL
);

CREATE TABLE falselia.agents (
  agent_id INT PRIMARY KEY,
  name VARCHAR (80) NOT NULL,
  email VARCHAR (80) NOT NULL,
  phoneNumber VARCHAR (10) NOT NULL,
  location VARCHAR (80) NOT NULL
);

CREATE TABLE falselia.listings (
  listing_id INT PRIMARY KEY,
  user_id INT,
  agent_id INT,
  sale BOOL,
  pending BOOL,
  new BOOL,
  construction BOOL,
  petFriendly BOOL,
  address VARCHAR (80) NOT NULL,
  price NUMERIC NOT NULL,
  bed SMALLINT NOT NULL,
  bath SMALLINT NOT NULL,
  crime NUMERIC,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);

CREATE TABLE falselia.paymentInfo (
  payment_id int PRIMARY KEY,
  user_id INT,
  ccNumber VARCHAR (19),
  ccName VARCHAR (80),
  ccAddress VARCHAR (80),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE falselia.searches (
  search_id int PRIMARY KEY,
  user_id int NOT NULL,
  saved_searches TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE falselia.images (
  image_id int PRIMARY KEY,
  listing_id int NOT NULL,
  image_url TEXT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON UPDATE CASCADE
);

CREATE TABLE falselia.schools (
  school_id int PRIMARY KEY,
  listing_id int NOT NULL,
  school_name TEXT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON UPDATE CASCADE
);


