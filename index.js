require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(cors({ origin: 'http://localhost:3000' }));

MongoClient.connect(process.env.MONGODB_URI, (error, database) => {

  if (error) {
    throw new Error(error.message);
  }

  app.get('/places', (request, response) => {

    database.collection('places')
      .find()
      .toArray()
      .then(places => {
        return response.send(places);
      })
      .catch(err => {
        console.error(err);
        return response.sendStatus(500);
      });

  });
  
});

app.listen(9000, _ => console.log('Listening on 9000...'));