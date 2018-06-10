const express = require('express')
const path = require('path')
const routes = require('./routes')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users')


const app = express()

// passport
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//connect to MongoDB
const connectWithRetry = function() {
  return mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 10 sec', err);
      setTimeout(connectWithRetry, 10000);
    }
  })
}
connectWithRetry()
const db = mongoose.connection
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
})

console.log('process.env.NODE_ENV : ' + process.env.NODE_ENV)

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(session({
  secret: 'wth',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


app.use('/', routes)


app.listen(3000, () => console.log('express listening on port 3000'))