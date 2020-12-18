var mongoose = require('mongoose');

let databaseInstanceIp = '13.57.40.2'
const url = `mongodb://rolo:password@${databaseInstanceIp}/main-gallery-listings`;

const connect = () => mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports.db = db;
module.exports.connect = connect;
