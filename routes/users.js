const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {

    res.json({
      success: false,
      message: 'Username or password missing'
    });

  } else {

    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(err => {
      if (err) {
        return res.json({
          success: false,
          message: 'Could not create user'
        });
      }
      res.json({
        success: true,
        message: 'User created'
      });
    });
  }
});

// Authenticate
router.post('/auth', (req, res) => {
  User.findOne({ username: req.body.username }).select('+password').exec((err, user) => {
    if (err) throw err;

    if (!user) {
      return res.json({
        success: false,
        message: 'Authentication failed'
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {

        const token = jwt.sign(user, config.secret, {
          expiresIn: "2 days"
        });

        const cleanUser = Object.assign({}, user.toObject());
        delete cleanUser.password;

        return res.json({
          success: true,
          message: 'Authentication successfull',
          token,
          user: cleanUser
        });

      }
      res.json({
        success: false,
        message: 'Authentication failed'
      });
    });

  });
});

// Get user info
router.get('/info', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json(req.user);
});

module.exports = router;