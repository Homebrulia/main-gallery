# System Design Capstone

Inherited Project to build & optimize database and server to handle webscale traffic

Frontend Owner: **Brandon Rusell**
Backend Owner: **Rodrigo Saavedra**

This service shows the main gallery for a trulia-like website.

# Database Schema:

This is the original data-shape of a listing:

  ```{
  listing_id: Number,
  topHeader: {
    sale: Boolean,
    pending: Boolean,
    new: Boolean,
    construction: Boolean,
  },
  address: String,
  price: Number,
  bed: Number,
  bath: Number,
  images: Array,
  }```


# Server API

## Get Listing

GET `/:id/homesData`
**Path Parameters:** Expects `id` to be an integer
**Success Status Code:** `200`

**Response Body:** Expects JSON with the following keys

 ```{
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
  }```

## Add Listing

POST `/addListing`
**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys

  ```{
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
  }```

## Update (modify) Listing

PATCH `/:id/homesData/update/`
**Path Parameters:** Expects `id` to be an integer
**Success Status Code:** `200`

**Request Body:** Expects JSON with the key-value pairs to be updated
Ex.
  ```{
    "address": "String"
  }```

## Delete Lisitng

DELETE `/:id/homesData/delete`
**Path Parameters:** Expects `id` to be an integer
**Success Status Code:** `204`
