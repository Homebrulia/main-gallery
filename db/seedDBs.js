const mongoose = require('mongoose');
const Schema = require('./schema.js');
const csv = require('csv-parser')
const fs = require('fs');

console.log(Schema.write);

// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////
function str2bool(str) {
  return str === 'true'
}
function parseChunks(objectType, chunk) {
  switch (objectType) {
    case 'listing': {
      if (chunk.schools.length) {
        chunk.images = chunk.images.split(',');
      }
      if (chunk.schools.length) {
        chunk.schools = chunk.schools.split(',');
      }
      break;
    }
    case 'user': {
      break;
    }
    case 'agent': {
      break;
    }
  }
  return chunk;

}
function addObjects(objectType) {
  let reader = fs.createReadStream(`${__dirname}/data/${objectType}s.csv`)
    .pipe(csv())
    .on('data', (chunk) => {
      // Schema.write(parseChunks(objectType, chunk), (err, response) => {
      //   err ? console.log('err', err) : console.log('added to database', response);
      // })
    })
}


addObjects('listing');
