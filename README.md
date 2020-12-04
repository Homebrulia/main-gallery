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

- MongoDB: (change)

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
  images: [String]
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
- PostgreSQL:

```
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
    images ARRAY NOT NULL
    UNIQUE (address)
    )

  CREATE TABLE users (
    user_id INT PRIMARY KEY,
    location VARCHAR (80) NOT NULL,
    name VARCHAR (80) NOT NULL,
    email VARCHAR (80) NOT NULL,
    phoneNumber VARCHAR (10),
    userType VARCHAR (12) NOT NULL,
    searches: ARRAY,
    UNIQUE (name, email)
    )

  CREATE TABLE paymentInfo (
    id SERIAL PRIMARY KEY,
    user_id: INT
    ccNumber: INT (19),
    ccName: VARCHAR (80),
    ccAddress: VARCHAR (80),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )

  CREATE TABLE favorites (
    user_id int NOT NULL,
    listing_id int NOT NULL,
    PRIMARY KEY (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON UPDATE CASCADE
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
  }
```
## Add Listing

POST `/homeData`
- **Success Status Code:** `201`

- **Request Body:** Expects JSON with the following keys
```
  {
  "listing_id": "Integer",
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
## Delete Lisitng

DELETE `/:id/homeData`
- **Path Parameters:** Expects `id` to be an integer
- **Success Status Code:** `204`
