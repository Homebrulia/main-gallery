var listings = require('../db/schema.js');
var mongo = require('../db/mongo.js');

/* eslint-disable array-callback-return */
// const schema = require('../db/schema.js');

getListing = (id, cb) => {
  listings.getOne('listing', id, (err, listing) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, listing);
    }
  });
}
getUser = (id, cb) => {
  listings.getOne('user', id, (err, user) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, user);
    }
  });
}
getAgent = (id, cb) => {
  listings.getOne('agent', id, (err, agent) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, agent);
    }
  });
}
postListing = (listing, cb) => {
  listings.insertOne('listing', listing, (err, listing) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, listing);
    }
  });
}
postUser = (user, cb) => {
  listings.insertOne('user', user, (err, listing) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, user);
    }
  });
}
postAgent = (agent, cb) => {
  listings.insertOne('agent', agent, (err, listing) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, agent);
    }
  });
}
module.exports.getListing = getListing;
module.exports.getUser = getUser;
module.exports.getAgent = getAgent;
module.exports.postListing = postListing;
module.exports.postAgent = postAgent;
module.exports.postUser = postUser;




























// module.exports = {
//   get: (req, res) => {
//     mongo.connect();
//     const query = schema.Listing.where({ id: req.params.id });
//     query.findOne((err, data) => {
//       if (err) {
//         res.status(404);
//         mongo.db.close();
//       } else {
//         res.status(200).send(data);
//         mongo.db.close();
//       }
//     });
//   },
//   getAll: (req, res) => {
//     mongo.connect();
//     schema.getAllListings.find((err, data) => {
//       if (err) {
//         res.status(404);
//       } else {
//         res.status(200).send(data);
//         mongo.db.close();
//       }
//     });
//   },
// };


