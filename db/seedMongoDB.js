const mongoose = require('mongoose');
const Schema = require('./schema.js');
const fs = require('fs');



// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////
function str2bool(str) {
  return str === 'true'
}
function typeParser(objectType, element) {
  switch (objectType) {
    case 'listing': {
      if (element.listing_id) {
        element.listing_id = Number(element.listing_id);
      }
      if (element.user_id) {
        element.user_id = Number(element.user_id);
      }
      if (element.agent_id) {
        element.agent_id = Number(element.agent_id);
      }
      if (element.sale) {
        element.sale = str2bool(element.sale)
      }
      if (element.pending) {
        element.pending = str2bool(element.pending)
      }
      if (element.new) {
        element.new = str2bool(element.new)
      }
      if (element.construction) {
        element.construction = str2bool(element.construction)
      }
      if (element.petFriendly) {
        element.petFriendly = str2bool(element.petFriendly)
      }
      if (element.price) {
        element.price = Number(element.price);
      }
      if (element.bed) {
        element.bed = Number(element.bed);
      }
      if (element.bath) {
        element.bath = Number(element.bath);
      }
      if (element.images.length > 2) {
        element.images = element.images.split(',');
      } else {
        element.images = [];
      }
      if (element.schools.length > 2) {
        element.schools = element.schools.split(',');
      } else {
        element.schools = [];
      }
      if (element.crime) {
        element.crime = Number(element.crime);
      }
      break;
    }
    case 'user': {
      if (element.user_id) {
        element.user_id = Number(element.user_id);
      }
      if (typeof element.paymentInfo === 'string'){
        element.paymentInfo = [];
      }
      if (element.favorites.length > 2) {
        element.favorites = element.favorites.slice(1, element.favorites.length - 1);
        element.favorites = element.favorites.split(',').map(key => Number(key));
      } else {
        element.favorites = [];
      }
      if (element.searches.length > 2) {
        element.searches = element.searches.slice(1, element.searches.length - 1);
        element.searches = element.searches.split(',');
      } else {
        element.searches = [];
      }
      break;
    }
    case 'agent': {
      if (element.agent_id) {
        element.agent_id = Number(element.agent_id);
      }
      if (element.managing.length > 2) {
        element.managing = element.managing.slice(1, element.managing.length - 1);
        element.managing = element.managing.split(',').map(key => Number(key));
      } else {
        element.managing = [];
      }
      break;
    }
  }
  return element;
}
function addObjects(objectType, callback) {
  let headerRow = true;
  let header = [];
  let partialLines = [];
  const start = Date.now();
  let chunks = [];
  let reader = fs.createReadStream(`${__dirname}/data/${objectType}s.csv`)
    .setEncoding('utf8')
    .on('data', (chunk) => {
      if (chunks.length > 250000) {
        console.log('reader paused, clearing buffer');
        reader.pause();
      } else {
        if (headerRow) {
          header = chunk.split('\n')[0].split('^');
          chunk = chunk.slice(chunk.indexOf('\n'), chunk.length);
          headerRow = false;
        }
        chunk = chunk.split('\n');
        chunk = chunk.slice(1, chunk.length - 1);
        chunk = chunk.map((line) => line.split('^'));
        chunk = chunk.map((line) => (
          '{' + line.map((item, index) => {
            if (item.length > 2 && item.indexOf('{') !== -1 && item.indexOf('}') !== -1) {
              item = JSON.parse(item);
              return `"${header[index]}":${JSON.stringify(item)}`
            } else if (item.length > 2 && item.indexOf('[') !== -1 && item.indexOf(']') !== -1) {
              item = '[' + item.slice(1, item.length - 1).split(',').map(subItem => `${subItem}`) + ']';
            }
            return `"${header[index]}":"${item}"`
          }) + '}'
        ));
        chunk = chunk.map(line => (
          JSON.parse(line)
        ))
        chunk = chunk.map((element) => (typeParser(objectType, element)));
        chunks = chunks.concat(chunk);
      }
    })
    .on('pause', () => {
      Schema.insertMany(objectType, chunks, (err, response) => {
        if (err) {
          console.log(err);
          reader.resume();
        } else {
          chunks = [];
          reader.resume();
        }
      })
    })
    .on('end', () => {
      console.log(`${objectType} data insertion done! Whole process took:`, `${Math.round((Date.now() - start) / (1000 * 60))} minutes`);
      callback();
    });
}

addObjects('listing', () => {
  console.log('all done!');
})

