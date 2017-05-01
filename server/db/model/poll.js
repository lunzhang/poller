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
  date: { type: Date, default: Date.now },
  options: {
    /**
    * option name : votes Number
    **/
    type: mongoose.Schema.Types.Mixed,
    default:{}
  },
  voters:{
    /**
    * user id : option name
    **/
    type: mongoose.Schema.Types.Mixed,
    default:{}
  }
}, { minimize: false });

mongoose.model('Poll', pollSchema);
