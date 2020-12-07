var mongoose = require('mongoose');
var mongo = require('./mongo.js');

mongoose.connect('mongodb://localhost/main-gallery-listings', { useNewUrlParser: true, useUnifiedTopology: true });

var listingSchema = mongoose.Schema({
  listing_id: Number,
  user_id: Number,
  agent_id: Number,
  sale: Boolean,
  pending: Boolean,
  new: Boolean,
  construction: Boolean,
  petFriendly: Boolean,
  address: {
    type: String,
    maxLength: 80,
    required: true
  },
  price: Number,
  bed: {
    type: Number,
    required: true
  },
  bath: {
    type: Number,
    required: true
  },
  images: [String],
  schools: [String],
  crime: Number
});
var userSchema = mongoose.Schema({
  user_id: Number,
  favorites: [listingSchema],
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
      type: Number,
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
  managing: [listingSchema]
});



let ListingsModel = mongoose.model('Listing', listingSchema);


function write(listing, callback) {
  ListingsModel.create(listing, callback)
}

function getAllListings(callback) {
  ListingsModel.find({}, callback);
}

module.exports.ListingsModel = ListingsModel;
module.exports.write = write;
module.exports.getAllListings = getAllListings;