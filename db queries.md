# Rodrigo's SDC Database Queries

## Database 1: Postgres

- listings (10 million records)
- users (10 million records)
- agents (10 million records)
- searches (50 million records)
- schools (20 million records)
- images (30 million records)
- payment info (30 million records)

## Database 2: MongoDB

- listings (11,413,958 records)
- users (9,910,334 records)
- agents (2,309,941 records)

## Postgresql Queries:


```
Request: SELECT * FROM falselia.agents WHERE agent_id = 1000000;

 agent_id |     name     |          email          | phonenumber |    location
----------+--------------+-------------------------+-------------+----------------
  1000000 | Jerrell Hand | Alfredo.Bosco@gmail.com | 4353145019  | New Jeanieland
(1 row)
```
```
Request: SELECT * FROM falselia.paymentInfo WHERE user_id = 980772;

 payment_id | user_id |      ccnumber      |     ccname      |                         ccaddress
------------+---------+--------------------+-----------------+------------------------------------------------------------
    3813563 |  980772 | 331216540803577800 | Hunter Swift    | 815 Lehner Underpass, Lake Emerson,Wisconsin 61437
   16938224 |  980772 | 728907637166634    | Andrew Schinner | 28822 Rahul Mission, East Jillianshire,Kentucky 47198-9863
   21472296 |  980772 | 79800193831454560  | Nelson Ullrich  | 6813 Jessie Pines, North Aliza,West Virginia 45643-4263
(3 rows)
```
```
Request: SELECT user_id  FROM searches WHERE saved_searches = 'temporibus';

 user_id
---------
 5397767
 5111373
 5401672
 6493122
 6895569
  549663
 2882530
 1896615
 6655753
 6874766
 4697143
 9478772
 1381648
  444796
 2351346
 9572876
 6535680
 5060849
 3300967
 2819078
 8802772

```
## MongoDB Queries:


```
Request:  db.listings.find({listing_id: 1}).pretty();

{
	"_id" : ObjectId("5fcffad9a56e113f39afbeb4"),
	"images" : [
		"https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home9.jpg",
		"https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home12.jpg",
		"https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home11.jpg"
	],
	"schools" : [ ],
	"listing_id" : 1,
	"user_id" : 6568743,
	"agent_id" : 194088,
	"sale" : false,
	"pending" : false,
	"new" : true,
	"construction" : false,
	"petFriendly" : true,
	"address" : "249 Keon Meadows, South Elvie, Indiana 77700-2968",
	"price" : 619.59,
	"bed" : 7,
	"bath" : 4,
	"crime" : 2,
	"__v" : 0
}
```
```
Request:  db.agents.find({managing:{$size:4}}).pretty()

{
	"_id" : ObjectId("5fcf8ae610d4065acd806f1e"),
	"managing" : [
		7196881,
		1641485,
		1157622,
		4646256
	],
	"agent_id" : 4,
	"name" : "Quentin Langosh",
	"email" : "Gilda.Pouros@hotmail.com",
	"phoneNumber" : "7186385958",
	"location" : "North Boview",
	"__v" : 0
}
{
	"_id" : ObjectId("5fcf8ae610d4065acd806f65"),
	"managing" : [
		9410750,
		4156292,
		1013182,
		1609689
	],
	"agent_id" : 75,
	"name" : "Michael Jacobson",
	"email" : "Mathias.Luettgen84@gmail.com",
	"phoneNumber" : "8434246719",
	"location" : "Denesikburgh",
	"__v" : 0
}
{
	"_id" : ObjectId("5fcf8ae610d4065acd806f73"),
	"managing" : [
		677978,
		1945665,
		9776989,
		3110325
	],
	"agent_id" : 89,
	"name" : "Stanley Yost",
	"email" : "Cecile.Rau62@gmail.com",
	"phoneNumber" : "3096688052",
	"location" : "New Burnice",
	"__v" : 0
}
{
	"_id" : ObjectId("5fcf8ae610d4065acd806f94"),
	"managing" : [
		5307001,
		6618322,
		6015783,
		4150370
	],
	"agent_id" : 122,
	"name" : "Tom Harber",
	"email" : "Linwood_Strosin@hotmail.com",
	"phoneNumber" : "4589426134",
	"location" : "Maximefurt",
	"__v" : 0
}

```