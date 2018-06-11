const express = require('express')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
const db = require('./db')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')

const app = express()

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