const express = require('express')
const path = require('path')
const routes = require('./routes')
var mongoose = require('mongoose');


const app = express()

//connect to MongoDB
var connectWithRetry = function() {
  return mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 10 sec', err);
      setTimeout(connectWithRetry, 10000);
    }
  });
};
connectWithRetry();

var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

console.log('process.env.NODE_ENV : ' + process.env.NODE_ENV)

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.use(express.json());

app.use('/', routes)


app.listen(3000, () => console.log('express listening on port 3000'))