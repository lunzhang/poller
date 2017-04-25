var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  owner:{
    type: String,
    required: true
  },
  options: {
    /**
    *option name : {
    * upVotes : Number,
    * downVotes : Number,
    * }
    **/
  },
});

mongoose.model('Poll', pollSchema);
