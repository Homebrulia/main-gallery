var mongoose = require('mongoose');
var mongo = require('./mongo.js');

mongoose.connect('mongodb://rolo:password@13.57.39.142/main-gallery-listings', { useNewUrlParser: true, useUnifiedTopology: true });

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
  favorites: [Number],
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
      type: String,
      minLength: 13,
      maxLength: 19,
    },
    ccName: {
      type: String,
      maxLength: 80,
    },
    ccAddress: {
      type: String,
      maxLength: 80,
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
  managing: [Number]
});

let ListingsModel = mongoose.model('Listing', listingSchema);
let UsersModel = mongoose.model('User', userSchema);
let AgentsModel = mongoose.model('Agent', agentSchema);


function insertOne(objType, obj, callback) {
  switch (objType) {
    case 'listing': {
      ListingsModel.create(obj, callback)
      break;
    }
    case 'user': {
      UsersModel.create(obj, callback)
      break;
    }
    case 'agent': {
      AgentsModel.create(obj, callback)
      break;
    }
  }
}
function insertMany(objType, arr, callback) {
  switch (objType) {
    case 'listing': {
      ListingsModel.insertMany(arr, callback)
      break;
    }
    case 'user': {
      UsersModel.insertMany(arr, callback)
      break;
    }
    case 'agent': {
      AgentsModel.insertMany(arr, callback)
      break;
    }
  }
}
function getAll(objType, callback) {
  switch (objType) {
    case 'listing': {
      ListingsModel.find({}, callback);
      break;
    }
    case 'user': {
      UsersModel.find({}, callback);
      break;
    }
    case 'agent': {
      AgentsModel.find({}, callback);
      break;
    }
  }
}
function getOne(objType, objId, callback) {
  switch (objType) {
    case 'listing': {
      ListingsModel.find({listing_id: objId}, callback);
      break;
    }
    case 'user': {
      UsersModel.find({user_id: objId}, callback);
      break;
    }
    case 'agent': {
      AgentsModel.find({agent_id: objId}, callback);
      break;
    }
  }
}
function createIndexes(objType) {
  switch (objType) {
    case 'listing': {
      ListingsModel.createIndexes([
        { listing_id: 1},
        { user_id: 1 },
        { agent_id: 1 },
        { address: "text" },
        { price: 1 }
      ]);
      break;
    }
    case 'user': {
      UsersModel.createIndexes({}, callback);
      break;
    }
    case 'agent': {
      AgentsModel.createIndexes({}, callback);
      break;
    }
  }
}

module.exports.ListingsModel = ListingsModel;
module.exports.UsersModel = UsersModel;
module.exports.AgentsModel = AgentsModel;
module.exports.insertOne = insertOne;
module.exports.insertMany = insertMany;
module.exports.getOne = getOne;
module.exports.getAll = getAll;
