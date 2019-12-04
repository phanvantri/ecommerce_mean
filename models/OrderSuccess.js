var mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;
var OrderSuccessSchema = new mongoose.Schema({
    id: String,
    name: String,
    product: Object,
    user:Object,
    status:Boolean,
    sum_price:String
  });
  
  module.exports = mongoose.model('ordersuccesses', OrderSuccessSchema);