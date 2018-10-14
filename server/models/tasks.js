const mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
  }
});


var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;