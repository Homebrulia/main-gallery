const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

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
// DATA GENERATION FUNCTIONS
/// /////////////////////////////////////////////////////////////////////////////////////////
//general data generation function
function genData(dataType, id) {
  if ('listing') {
    return createListing(id);
  } else if ('user') {
    return createUser(id);
  } else if ('agent') {
    return createAgent(id);
  }
}
// generate a randomized listing object
function createListing(listing_id) {
  return {
    listing_id,
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
  };
}
// generate random payment info
function createPaymentInfo(length) {
  const ccLengths = [13, 14, 15, 16, 17, 18, 19];
  const paymentInfo = [];
  for (let i = 0; i < length; i++) {
    paymentInfo.push({
      ccNumber: randomNum(ccLengths[i % ccLengths.length]),
      ccName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      ccAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`
    });
  }
  return paymentInfo;
}
// create a randomized user object
function createUser(user_id) {
  const userTypes = ['renter', 'seller', 'buyer'];
  return {
    user_id,
    favorites: randomIntArr(randomInt(10)),
    searches: randomStringArr(randomInt(5)),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber().slice(0, 11),
    location: faker.address.city(),
    userType: userTypes[randomInt(userTypes.length)],
    paymentInfo: createPaymentInfo(randomInt(5))
  };
}
// create a randomized agent object
function createAgent(agent_id) {
  return {
    agent_id,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber().slice(0, 11),
    location: faker.address.city(),
    managing: randomIntArr(randomInt(10))
  };
}
// WRITE-TO-FILE FUNCTION
/// //////////////////////////////////////////////////////////////////////////////////
function toCSVFile(fileLength, objectType) {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream(`${__dirname}/data/${objectType}s.csv`));
  let counter = 0;
  const start = Date.now();
  function write() {
    let ok = true;
    do {
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
