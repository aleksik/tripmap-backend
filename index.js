require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) return console.log(err);
  db = database;
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'oukkidoukki' });
});

app.get('/places', (req, res) => {
  db.collection('places').find().toArray()
    .then(places => res.send(places))
    .catch(err => console.log(err));
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});