// server environment variables
require('dotenv').config();

const express = require('express')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
const db = require('./db')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const helmet = require('helmet')

const app = express()

console.log('process.env.NODE_ENV : ' + process.env.NODE_ENV)

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.disable('x-powered-by')
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.frameguard({ action: 'sameorigin' }))
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

app.use((req, res) => {
  res.sendStatus(404);
});


app.listen(3000, () => console.log('express listening on port 3000'))