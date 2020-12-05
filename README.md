# System Design Capstone

Inherited Project to build & optimize database and server to handle webscale traffic

- Frontend Owner: **Brandon Rusell**
- Backend Owner: **Rodrigo Saavedra**

This service shows the main gallery for a trulia-like website.

# Database Schema:

This is the original data-shape of a listing (in mongoDB):

listing schema
  ```
  {
  listing_id: Number,
  topHeader: {
    sale: Boolean,
    pending: Boolean,
    new: Boolean,
    construction: Boolean
  },
  address: String,
  price: Number,
  bed: Number,
  bath: Number,
  images: [String]
  }
  ```
# New Schemas


- MongoDB:

listing schema
```
{
  listing_id: Number,
  sale: Boolean,
  pending: Boolean,
  new: Boolean,
  construction: Boolean,
  pet-friendly: Boolean,
  address: String,
  price: Number,
  bed: Number,
  bath: Number,
  images: [String],
  schools: [String],
  crime: Number
}
```
user schema
```
{
  user_id: Number,
  favorites: [listings],
  searches: [String],
  name: String,
  email: String,
  phone-number: Number,
  location: String,
  user-type: String,
  },
  payment-info: [{
    cc-number: Number,
    cc-name: String,
    cc-address: String
  }]
}
```
agent schema
```
{
  agent_id: Number,
  managing: [listings],
  name: String,
  email: String,
  phone-number: Number,
  location: String
}
```

- PostgreSQL:

```
CREATE SCHEMA falseLia

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
CREATE TABLE agents (
    agent_id INT PRIMARY KEY,
    location VARCHAR (80) NOT NULL,
    name VARCHAR (80) NOT NULL,
    email VARCHAR (80) NOT NULL,
    phoneNumber VARCHAR (10) NOT NULL,
    UNIQUE(name, email, phoneNumber)
)

 CREATE TABLE listings (
    listing_id INT PRIMARY KEY,
    user_id INT,
    agent_id INT,
    sale BOOL,
    pending BOOL,
    new BOOL,
    construction BOOL,
    address VARCHAR (80) NOT NULL,
    price NUMERIC NOT NULL,
    bed SMALLINT NOT NULL,
    bath SMALLINT NOT NULL,
    images TEXT [] NOT NULL,
    schools TEXT [],
    crime NUMERIC,
    UNIQUE(address),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
  )

  CREATE TABLE paymentInfo (
    id SERIAL PRIMARY KEY,
    user_id INT,
    ccNumber VARCHAR (19),
    ccName VARCHAR (80),
    ccAddress VARCHAR (80),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
  )

  CREATE TABLE managing (
    agent_id int NOT NULL,
    listing_id int NOT NULL,
    PRIMARY KEY (agent_id, listing_id),
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON UPDATE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON UPDATE CASCADE
  )
  CREATE TABLE favorites (
    user_id int NOT NULL,
    listing_id int NOT NULL,
    PRIMARY KEY (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON UPDATE CASCADE
  );

```

# Server API

## Get Listing

GET `/:id/homeData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `200`

- **Response Body:** Expects JSON with the following keys

```
 {
  "_id": "Integer",
  "listing_id": "Integer",
  "user_id": "Integer",
  "agent_id": "Integer",
  "topHeader": {
    "sale": "Boolean",
    "pending": "Boolean",
    "new": "Boolean",
    "construction": "Boolean",
  },
  "address": "String",
  "price": "Integer",
  "bed": "Integer",
  "bath": "Integer",
  "images": ["String"],
  "schools": ["String"],
  "crime": "Integer"
  }
```

## Get User

GET `/:id/userData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `200`

- **Response Body:** Expects JSON with the following keys

```
 {
  "user_id": "Number",
  "favorites": ["String"],
  "searches": ["String"],
  "name": "String"
  "email": "String",
  "phoneNumber": "String",
  "location": "String",
  "userType": "String",
  "paymentInfo": [{
    ccNumber: "Number",
    ccName: "String",
    ccAddress: "String"
  }]
}
```
## Get User

GET `/:id/agentData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `200`

- **Response Body:** Expects JSON with the following keys

```
 {
  "agent_id": "Number",
  "managing": ["String"],
  "name": "String"
  "email": "String",
  "phoneNumber": "String",
  "location": "String"
}
```
## Add Listing

POST `/homeData`
- **Success Status Code:** `201`

- **Request Body:** Expects JSON with the following keys
```
  {
 "_id": "Integer",
  "listing_id": "Integer",
  "user_id": "Integer",
  "agent_id": "Integer",
  "topHeader": {
    "sale": "Boolean",
    "pending": "Boolean",
    "new": "Boolean",
    "construction": "Boolean",
  },
  "address": "String",
  "price": "Integer",
  "bed": "Integer",
  "bath": "Integer",
  "images": ["String"],
  "schools": ["String"],
  "crime": "Integer"
  }
```

## Add User

POST `/userData`
- **Success Status Code:** `201`

- **Request Body:** Expects JSON with the following keys
```
 {
  "user_id": "Number",
  "favorites": ["String"],
  "searches": ["String"],
  "name": "String"
  "email": "String",
  "phoneNumber": "String",
  "location": "String",
  "userType": "String",
  "paymentInfo": [{
    ccNumber: "Number",
    ccName: "String",
    ccAddress: "String"
  }]
}
```

## Update (modify) Listing

PATCH `/:id/homeData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `200`

- **Request Body:** Expects JSON with the key-value pairs to be updated
Ex.
```
  {
    "address": "String"
  }
```
## Update (modify) User

PATCH `/:id/userData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `200`

- **Request Body:** Expects JSON with the key-value pairs to be updated
Ex.
```
  {
    "address": "String"
  }
```
## Delete Lisitng

DELETE `/:id/homeData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `204`

## Delete User

DELETE `/:id/userData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `204`

