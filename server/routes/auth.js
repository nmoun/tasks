const router = require('express').Router();
const User = require('../models/users')
const passport = require('passport')
const jwt = require('jsonwebtoken');

router.post('/register', function(req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    return res.status(400).json({
      message: 'Passwords do not match.'
    });
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

router.post('/login', function(req, res, next){
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // custom callback to handle authentication

    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }

    console.log('/api/login, typeof user: ' + typeof user)
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response
      console.log('cb /api/login, user: ' + user)
      console.log('cb /api/login, typeof user: ' + typeof user)
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '2h'});
      return res.json({ user, token });
    });
  })(req, res, next);
})

router.post('/logout', (req, res, next) => {
  console.log('/api/logout')
  req.session.destroy();
  next();
}, (req, res) => {
  console.log('/api/logout after')
  req.logout();
  res.redirect('/')
})

module.exports = router