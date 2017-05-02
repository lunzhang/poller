var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  loginType:{
    type: String,
    unique: true,
    required: true
  },
  fbId:{
    type: String,
    unique: true
  },
  name:{
    type: String,
    required: true
  },
  polls: [],
  detail: String
});

mongoose.model('User', userSchema);
