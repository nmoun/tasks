const mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  id: String,
  description: String,
  composition: String,
  quantity: Number
}, { _id: false });

var TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
  },
  header: {
    type: Object
  },
  content: {
    articles: [articleSchema]
  }
});


var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;