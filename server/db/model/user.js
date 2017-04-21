var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  polls: [String],
  detail: String
});

mongoose.model('User', userSchema);