const router = require('express').Router();
const User = require('../models/users')
const passport = require('passport')
const db = require('../db')

router.post('/api/register', function(req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        console.log('user saved')
        // req.session.userId = user._id;
        res.json({ status: 'ok' })
      }
    });
  }
});

router.post('/api/login', passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('login sucess')
    if(req.user && typeof req.user === "object")
      console.log(JSON.stringify(req.user))
    res.send({message: 'ok'});
  }
);

router.post('/api/logout', (req, res, next) => {
  console.log('/api/logout')
  req.session.destroy();
  next();
}, (req, res) => {
  console.log('/api/logout after')
  req.logout();
  res.sendStatus(200);
})

router.get('/api/authRequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send({'message': 'protected message'})
  } else {
    console.log('unauthorized')
    res.sendStatus(401)
  }
})

module.exports = router;