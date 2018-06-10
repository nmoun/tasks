const router = require('express').Router();
const User = require('../models/users')

router.post('/api/register', function (req, res, next) {
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

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        console.log('user saved')
        req.session.userId = user._id;
        res.json({ status: 'ok' })
      }
    });
  }
});

router.post('/api/login', function(req, res, next){
  console.log('/api/login: email: ' + req.body.email)
  console.log('/api/login: password: ' + req.body.password)

  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.json({status: 'ok'});
    }
  });
});

module.exports = router;