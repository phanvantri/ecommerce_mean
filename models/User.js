var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    fullname: String,
    address: String,
    email: String,
    phone: String,
    password:String,
    role:String,
    // updated_date: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('user', UserSchema);