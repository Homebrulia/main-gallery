let mongoose = require('mongoose');
let Schema = require('./schema.js');
let faker = require('faker');

//HELPER FUNCTIONS:
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//returns a random number
function randomInt(excludedMax) {
  return Math.floor(Math.random() * Math.floor(excludedMax));
}
//returns a string array of random length, with optional prefixes and suffixes
function randomStringArr(length, prefixes, suffixes) {
  var arr = [];
  for (var i = 0; i < randomInt(length); i++) {
    if (prefixes) {
      arr.push(`${prefixes[randomInt(prefixes.length)]} ${faker.lorem.word(10)}`);
    } else if (suffixes) {
      arr.push(`${faker.lorem.word(10)} ${suffixes[randomInt(suffixes.length)]}`);
    } else {
      arr.push(faker.lorem.word(10));
    }
  }
  return arr;
}
// returns a random number array of fixed length
function randomIntArr(length) {
  var arr = [];
  for (var i = 0; i < randomInt(length); i++) {
    arr.push(randomInt(10000000));
  }
  return arr;
}
//returns a number of specified length
function randomNum(length) {
  var str = '';
  for (var i = 0; i < length; i++) {
    str = str.concat('', randomInt(10).toString());
  }
  return Number(str);
}
//returns a randomized image gallery
function randomImages() {
  var arr = [];
  for (var i = 0; i < randomInt(5); i++) {
    arr.push(`https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home${randomInt(30)}.jpg`);
  }
  return arr;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//generate a randomized listing object
function createListing(listing_id) {
  return {
    listing_id: listing_id,
    user_id: randomInt(10000000),
    agent_id: randomInt(1000000),
    sale: !!(randomInt(2)),
    pending: !!(randomInt(2)),
    new: !!(randomInt(2)),
    construction: !!(randomInt(2)),
    petFriendly: !!(randomInt(2)),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
    price: faker.finance.amount(),
    bed: randomInt(10),
    bath: randomInt(5),
    images: randomImages(),
    schools: randomStringArr(randomInt(5), undefined, ['Elementary', 'Middle School', 'High']),
    crime: randomInt(10)
  }
}
//generate random payment info
function createPaymentInfo(length) {
  ccLengths = [13, 14, 15, 16, 17, 18, 19];
  paymentInfo = [];
  for (var i = 0; i < length; i++) {
    paymentInfo.push({
      ccNumber: randomNum(ccLengths[randomInt(ccLengths.length)]),
      ccName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      ccAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`
    });
  }
  return paymentInfo;
}
//create a randomized user object
function createUser(user_id) {
  let userTypes = ['renter', 'seller', 'buyer'];
  return {
    user_id: user_id,
    favorites: randomIntArr(randomInt(10)),
    searches: randomStringArr(randomInt(5)),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber().slice(0, 11),
    location: faker.address.city(),
    userType: userTypes[randomInt(userTypes.length)],
    paymentInfo: createPaymentInfo(randomInt(5))
  }
}
//create a randomized agent object
function createAgent(agent_id) {
  return {
    agent_id: agent_id,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber().slice(0, 11),
    location: faker.address.city(),
    managing: randomIntArr(randomInt(10))
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i=0; i < 3; i++) {
  console.log(createAgent(i));
}
// console.log(createUser(1));
// console.log(createAgent(1));