const express = require('express');
const passport = require('passport');
const Place = require('../models/place');
const router = express.Router();

// List
router.get('/', (req, res) => {
  Place.find({}, (err, places) => {
    res.json(places);
  });
});

// Create
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const newPlace = new Place({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    position: {
      lat: req.body.position.lat,
      lng: req.body.position.lng
    }
  });

  newPlace.save(err => {
    if (err) {
      return res.json({
        success: false,
        message: 'Could not create place'
      });
    }
    res.json({
      success: true,
      message: 'Place created'
    });
  });

});

// Update
router.post('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const updatedPlace = Object.assign({}, req.body, { _user: req.user._id });

  Place.findOneAndUpdate({ _id: req.params.id, _user: req.user._id}, updatedPlace, (err, place) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Could not update place'
      });
    }
    return res.json({
      success: true,
      message: 'Place updated'
    });
  })
})

module.exports = router;