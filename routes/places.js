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

  Place.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    position: {
      lat: req.body.position && req.body.position.lat,
      lng: req.body.position && req.body.position.lng
    }
  }, (err, place) => {
    if (err) {
      const errors = {};
      Object.entries(err.errors).forEach(([field, { kind }]) => {
        errors[field] = kind;
      });
      return res.status(400).json({
        success: false,
        message: 'Could not create place',
        errors
      });
    }
    res.status(200).json({
      success: true,
      message: 'Place created',
      place
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
      return res.json(400, {
        success: false,
        message: 'Could not update place'
      });
    }
    return res.json(200, {
      success: true,
      message: 'Place updated'
    });
  })
})

module.exports = router;