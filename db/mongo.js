var mongoose = require('mongoose');

const url = 'mongodb://rolo:password@13.57.39.142/main-gallery-listings';

const connect = () => mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports.db = db;
module.exports.connect = connect;
