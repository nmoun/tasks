const mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  composition: String
})

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;