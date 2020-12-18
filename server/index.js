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
let serviceInstanceIp = '3.101.140.84';
app.listen(PORT, () => {
  console.log(`Listening on http://${serviceInstanceIp}:${PORT}/gallery/1/`);
});


app.use('/api/gallery', router);
let loaderIoKey = 'loaderio-73f15b59d9e698a129b86e043e2ed6d7';
app.get(`/${loaderIoKey}`, (req, res) => {res.send(`${loaderIoKey}`)});
