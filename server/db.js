const mongoose = require('mongoose')

//connect to MongoDB
mongoose.connect('mongodb://localhost/test', function(err) {
  if (err) {
    console.error('Failed to connect to mongo on startup', err);
  }
});
const db = mongoose.connection
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
})

module.exports = db