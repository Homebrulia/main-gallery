const faker = require('faker');
const fs = require('fs');

// HELPER FUNCTIONS:
/// ////////////////////////////////////////////////////////////////////////////////////////////////
// returns a random number
function R(excludedMax) {
  return Math.floor(Math.random() * Math.floor(excludedMax));
}
// returns a number of specified length
function randomNum(length) {
  let str = '';
  for (let i = 0; i < length; i++) {
    str = str.concat('', R(10).toString());
  }
  return Number(str);
}
// HELPER DATA
/// /////////////////////////////////////////////////////////////////////////////////////////
// address arrays
let streets = []
let cities = [];
let state = [];
let zipcode = [];
//word arrays
let wordsArr = [];
let firstNames = [];
let lastNames = [];
let emails = [];
const userTypes = ['renter', 'seller', 'buyer'];
const gradeArr = ['Elementary', 'Middle School', 'High'];
//number arrays
const ccLengths = [13, 14, 15, 16, 17, 18, 19];
let ccNumbers = [];
for (var i = 0; i < 1000000; i++) {
  streets.push(faker.address.streetAddress());
  cities.push(faker.address.city());
  state.push(faker.address.state());
  zipcode.push(faker.address.zipCode());
  wordsArr.push(faker.lorem.word(10));
  firstNames.push(faker.name.firstName());
  lastNames.push(faker.name.lastName());
  ccNumbers.push(randomNum(ccLengths[R(7)]));
  emails.push(faker.internet.email())
}


// DATA GENERATION FUNCTIONS
/// /////////////////////////////////////////////////////////////////////////////////////////
//general data generation function
function genData(dataType, id) {
  switch (dataType) {
    case 'listing': {
      return createListing(id);
    }
    case 'user': {
      return createUser(id);
    }
    case 'agent': {
      return createAgent(id);
    }
    case 'paymentInfo': {
      return createPaymentInfo(id);
    }
    case 'search': {
      return createSearch(id);
    }
    case 'school': {
      return createSchool(id);
    }
    case 'image': {
      return createImage(id);
    }
  }
}
// generate a randomized listing string
function createListing(listing_id) {
  return (
    `${listing_id}^${R(10000000)}^${R(1000000)}^${!!(R(2))}^${!!(R(2))}^${!!(R(2))}^${!!(R(2))}^${!!(R(2))}^${streets[R(10000)]}, ${cities[R(10000)]}, ${state[R(10000)]} ${zipcode[R(10000)]}^${faker.finance.amount()}^${R(10)}^${R(5)}^${R(10)}\n`
    );
}
// create a randomized user string
function createUser(user_id) {

  return (
    `${user_id}^${firstNames[R(10000)]} ${lastNames[R(10000)]}^${emails[R(10000)]}^${randomNum(10)}^${cities[R(10000)]}^${userTypes[R(userTypes.length)]}\n`
  );
}
// create a randomized agent string
function createAgent(agent_id) {
  return (
    `${agent_id}^${firstNames[R(10000)]} ${lastNames[R(10000)]}^${emails[R(10000)]}^${randomNum(10)}^${cities[R(10000)]}\n`
  );
}
// create a randomized payment info string
function createPaymentInfo(id) {
  return (`${id}^${R(10000000)}^${ccNumbers[R(10000)]}^${firstNames[R(10000)]} ${lastNames[R(10000)]}^${streets[R(10000)]}, ${cities[R(10000)]},${state[R(10000)]} ${zipcode[R(10000)]}\n`);
}
//create a randomized search string
function createSearch(id){
  return (
    `${id}^${R(10000000)}^${wordsArr[R(10000)]}\n`
  );
}
//create a randomized school string
function createSchool(id) {
  return (
    `${id}^${R(10000000)}^${wordsArr[R(10000)]} ${gradeArr[R(3)]}\n`
  );
}
function createImage(id) {
  return (
    `${id}^${R(10000000)}^https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home${R(30)}.jpg\n`
  );
}
// WRITE-TO-FILE FUNCTION
/// //////////////////////////////////////////////////////////////////////////////////
function toCSVFile(fileLength, objectType) {
  const writer = fs.createWriteStream(`${__dirname}/data/SQL${objectType}s.csv`);
  let counter = 0;
  const start = Date.now();
  function write() {
    let ok = true;
    do {
      if (counter === 0) {
        let header = '';
        switch (objectType) {
          case 'listing': {
            header = `listing_id^user_id^agent_id^sale^pending^new^construction^petFriendly^address^price^bed^bath^crime\n`
            break;
          }
          case 'user': {
            header = `user_id^name^email^phoneNumber^location^userType\n`
            break;
          }
          case 'agent': {
            header = `agent_id^name^email^phoneNumber^location\n`
            break;
          }
          case 'paymentInfo': {
            header = `payment_id^user_id^ccNumber^ccName^ccAddress\n`
            break;
          }
          case 'search': {
            header = `search_id^user_id^saved_searches\n`
            break;
          }
          case 'image': {
            header = `image_id^listing_id^image_url\n`
            break;
          }
          case 'school': {
            header = `school_id^listing_id^school_name\n`
            break;
          }
        }
        writer.write(header);
      }
      counter++;
      if (counter === fileLength) {
        writer.write(genData(objectType, counter));
        writer.end();
        console.log(`${objectType} Data generation done! Whole process took:`, `${(Date.now() - start) / (1000 * 60)} minutes`);
      } else {
        ok = writer.write(genData(objectType, counter));
      }
    } while (counter < fileLength && ok);
    if (counter < fileLength) {
      if (!ok) {
        writer.once('drain', write);
      }
    }
  }
  write();
}
toCSVFile(10000000, 'agent');
toCSVFile(10000000, 'listing');
toCSVFile(10000000, 'user');
toCSVFile(50000000, 'search');
toCSVFile(20000000, 'school');
toCSVFile(30000000, 'image');
toCSVFile(30000000, 'paymentInfo');

