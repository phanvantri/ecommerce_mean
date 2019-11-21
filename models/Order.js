var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    id: String,
    name: String,
    linkimage: String,
    note: String,
    dateorder: Date,
    price: String,
    note: String,
    status: String
    
  });
  
  module.exports = mongoose.model('orders', OrderSchema);