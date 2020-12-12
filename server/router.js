var express = require('express');
var controllers = require('../controllers/listing.js');

var router = express.Router();

router.get('/:id/homesData/', (req, res) => {
  controllers.getListing(req.params.id, (err, listing) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.status(200).send(listing);
    }
  });
});
router.post('/homesData/', (req, res) => {
  controllers.postListing(req.body, (err, listing) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.status(200);
    }
  });
});
router.get('/:id/userData/', (req, res) => {
  controllers.getUser(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.status(200).send(user);
    }
  });
});
router.post('/userData/', (req, res) => {
  controllers.postUser(req.body, (err, user) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.status(200);
    }
  });
});
router.post('/agentData/', (req, res) => {
  controllers.postAgent(req.body, (err, agent) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.status(200);
    }
  });
});
router.get('/:id/agentData/', (req, res) => {
  controllers.getAgent(req.params.id, (err, agent) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.status(200).send(agent);
    }
  });
});

module.exports = router;