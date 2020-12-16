const faker = require('faker');
const fs = require('fs');

// HELPER FUNCTIONS:
/// ////////////////////////////////////////////////////////////////////////////////////////////////
// returns a random number
function randomInt(excludedMax) {
  return Math.floor(Math.random() * Math.floor(excludedMax));
}
// returns a string array of random length, with optional prefixes and suffixes
function randomStringArr(length, prefixes, suffixes) {
  const arr = [];
  for (let i = 0; i < randomInt(length); i++) {
    if (prefixes) {
      arr.push(`${prefixes[randomInt(prefixes.length)]} ${wordsArr[randomInt(10000)]}`);
    } else if (suffixes) {
      arr.push(`${wordsArr[randomInt(10000)]} ${suffixes[randomInt(suffixes.length)]}`);
    } else {
      arr.push(wordsArr[randomInt(10000)]);
    }
  }
  return arr;
}
// returns a random number array of fixed length
function randomIntArr(length) {
  const arr = [];
  for (let i = 0; i < randomInt(length); i++) {
    arr.push(randomInt(10000000));
  }
  return arr;
}
// returns a number of specified length
function randomNum(length) {
  let str = '';
  for (let i = 0; i < length; i++) {
    str = str.concat('', randomInt(10).toString());
  }
  return Number(str);
}
// returns a randomized image gallery
function randomImages() {
  const arr = [];
  for (let i = 0; i < randomInt(5); i++) {
    arr.push(`https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home${randomInt(30)}.jpg`);
  }
  return arr;
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
const userTypes = ['renter', 'seller', 'buyer'];
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
  ccNumbers.push(randomNum(ccLengths[randomInt(7)]));
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
  }
}
// generate a randomized listing object
function createListing(listing_id) {
  return (
    `${listing_id}^${randomInt(10000000)}^${randomInt(1000000)}^${!!(randomInt(2))}^${!!(randomInt(2))}^${!!(randomInt(2))}^${!!(randomInt(2))}^${!!(randomInt(2))}^${streets[randomInt(10000)]}, ${cities[randomInt(10000)]}, ${state[randomInt(10000)]} ${zipcode[randomInt(10000)]}^${faker.finance.amount()}^${randomInt(10)}^${randomInt(5)}^${randomImages()}^${randomStringArr(randomInt(5), undefined, ['Elementary', 'Middle School', 'High'])}^${randomInt(10)}\n`
    );
}
// generate random payment info
function createPaymentInfo(length) {
  const paymentInfo = [];
  for (let i = 0; i < length; i++) {
    paymentInfo.push({
      ccNumber: ccNumbers[randomInt(10000)],
      ccName: `${firstNames[randomInt(10000)]} ${lastNames[randomInt(10000)]}`,
      ccAddress: `${streets[randomInt(10000)]}, ${cities[randomInt(10000)]}, ${state[randomInt(10000)]} ${zipcode[randomInt(10000)]}`
    });
  }
  return JSON.stringify(paymentInfo);
}
// create a randomized user object
function createUser(user_id) {

  return (
    `${user_id}^[${randomIntArr(randomInt(10))}]^[${randomStringArr(randomInt(5))}]^${firstNames[randomInt(10000)]} ${lastNames[randomInt(10000)]}^${faker.internet.email()}^${randomNum(10)}^${cities[randomInt(10000)]}^${userTypes[randomInt(userTypes.length)]}^${createPaymentInfo(randomInt(5))}\n`
  );
}
// create a randomized agent object
function createAgent(agent_id) {
  return (
    `${agent_id}^${firstNames[randomInt(10000)]} ${lastNames[randomInt(10000)]}^${faker.internet.email()}^${randomNum(10)}^${cities[randomInt(10000)]}^[${randomIntArr(randomInt(10))}]\n`
  );
}
// WRITE-TO-FILE FUNCTION
/// //////////////////////////////////////////////////////////////////////////////////
function toCSVFile(fileLength, objectType, callback) {
  const writer = fs.createWriteStream(`${__dirname}/data/${objectType}s.csv`);
  let counter = 0;
  const start = Date.now();
  function write() {
    let ok = true;
    do {
      if (counter === 0) {
        let header = '';
        switch (objectType) {
          case 'listing': {
            header = `listing_id^user_id^agent_id^sale^pending^new^construction^petFriendly^address^price^bed^bath^images^schools^crime\n`
            break;
          }
          case 'user': {
            header = `user_id^favorites^searches^name^email^phoneNumber^location^userType^paymentInfo\n`
            break;
          }
          case 'agent': {
            header = `agent_id^name^email^phoneNumber^location^managing\n`
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
        callback();
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
toCSVFile(1100000, 'agent', () => {
  toCSVFile(11000000, 'listing', () => {
    toCSVFile(11000000, 'user', () => {
      console.log('All done')
    });
  });
});



