require('dotenv').config();

require('mongodb').MongoClient
  .connect(process.env.MONGODB_URI)
  .then(db => {

    db.dropCollection('places', () => {
      db.createCollection('places')
        .then(collection => collection.insertMany([
          {
            name: 'Yakinthos',
            description: 'Laganas 29092, Greece',
            category: 'hotel',
            position: {
              lat: 37.744392,
              lng: 20.8618543
            }
          },    
          {
            name: 'Panos',
            category: 'restaurant',
            description: 'Laganas,Kalamaki Road',
            position: {
              lat: 37.731384,
              lng: 20.866907
            }
          }
        ]))
        .then(result => {
          console.log(`Database seeded with ${result.insertedCount} entries`);
          db.close();
        })
        .catch(err => {
          console.log(err);
          db.close();
        });

    });

  });