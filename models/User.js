var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  username:String,
  password:String,
  credits: {
    type: Number,
    default: 0
  }
 
  });
  
  module.exports = mongoose.model('users', UserSchema);