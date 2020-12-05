let mongoose = require('mongoose');
let Schema = require('./schema.js');
let faker = require('faker');


//mongoose.connect('mongodb://localhost/main-gallery');

// TODO:
// 1) Take out hardcoded data and create helper functions to generate inputs.
// 2) Drop database before wrtiting to again.

function randomInt(excludedMax) {
  return Math.floor(Math.random() * Math.floor(excludedMax));
}
function createListing(listing_id, user_id, agent_id, images, schools) {
  return {
    listing_id: listing_id,
    user_id: user_id,
    agent_id: agent_id,
    sale: !!(randomInt(2)),
    pending: !!(randomInt(2)),
    new: !!(randomInt(2)),
    construction: !!(randomInt(2)),
    petFriendly: !!(randomInt(2)),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}` ,
    price: faker.finance.amount(),
    bed: randomInt(10),
    bath: randomInt(5),
    images: [String],
    schools: [String],
    crime: Number
  }
  return listing;
}

var userSchema = mongoose.Schema({
  user_id: Number,
  favorites: [listings],
  searches: [String],
  name: {
    type: String,
    maxLength: 80,
    required: true
  },
  email: {
    type: String,
    maxLength: 80,
    required: true
  },
  phoneNumber: {
    type: String,
    maxLength: 10,
  },
  location: String,
  userType: String,
  paymentInfo: [{
    ccNumber: {
      type: Name,
      min: 13,
      max: 19,
      required: true
    },
    ccName: {
      type: String,
      maxLength: 80,
      required: true
    },
    ccAddress: {
      type: String,
      maxLength: 80,
      required: true
    }
  }]
});
var agentSchema = mongoose.Schema({
  agent_id: Number,
  name: {
    type: String,
    maxLength: 80,
    required: true
  },
  email: {
    type: String,
    maxLength: 80,
    required: true
  },
  phoneNumber: {
    type: String,
    maxLength: 10,
  },
  location: String,
  managing: [listings]
});

var listingSchema = mongoose.Schema({

});



// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function listingGalleryGenerator(currentFolder) {
  let images = [];
  if (currentFolder === 1) {
    let counter = 1;
    while (counter <= 77) {
      let url = `https://s3-us-west-1.amazonaws.com/hackreactor.fec.trulia.photos/Home1/Home-1-${counter}.jpg`
      images.push(url)
      counter++;
    }
  } else {
    if (currentFolder === 2) {
      let counter = 1;
      while (counter <= 31) {
        let url = `https://s3-us-west-1.amazonaws.com/hackreactor.fec.trulia.photos/Home2/Home-2-${counter}.jpg`
        images.push(url)
        counter++;
      }
    } else {
      if (currentFolder === 3) {
        let counter = 1;
        while (counter <= 39) {
          let url = `https://s3-us-west-1.amazonaws.com/hackreactor.fec.trulia.photos/Home3/Home-3-${counter}.jpg`
          images.push(url)
          counter++;
        }
      }
    }
  }
  return images;
};

function seedDB(entries) {
  let created = 1;
  let folder = 1;
  let address = '232 Clinton Park';
  let price = 1875000;
  let bed = 4;
  let bath = 3;
  while (created <= 100) {
    // Image folder assignment and url generator
    let images = listingGalleryGenerator(folder);
    if (folder === 1) {
      address = '232 Clinton Park';
      price = 1875000;
      bed = 4;
      bath = 3;
    }
    if (folder === 2) {
      address = '4137 Hidden Oaks Rd';
      price = 65000000;
      bed = 10;
      bath = 7;
    }
    if (folder === 3) {
      address = '23800 Malibu Crest Dr';
      price = 1495000;
      bed = 4;
      bath = 2;
      folder = 0;
    }
    // Faker address
    // var address = faker.address.streetAddress();
    // Call to write to database
    Schema.write(createRecord(created, address, price, bed, bath, images), (err, data) => {
      if (err) {
        console.log('insert failed', err)
      } else {
        console.log('insert success');
      }
    })
    folder++;
    created++;
  }
}

seedDB();