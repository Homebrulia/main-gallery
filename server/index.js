var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router.js');
require('newrelic');

// const path = require('path')

const app = express();
const PORT = 8040;

app.use(bodyParser.json());
app.use('/gallery/:id', express.static('client/dist'));
app.use(express.static('client/dist'));


// app.get('/listings/:id/db', controller.getAll);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/gallery/1/`);
});


app.use('/api/gallery', router);

