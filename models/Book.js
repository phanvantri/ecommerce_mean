const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: String,
  publisher: String,
 
});

const Book= module.exports = mongoose.model('books', BookSchema);
