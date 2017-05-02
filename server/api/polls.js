var mongoose = require('mongoose');
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');

module.exports.uploadPoll = function(req,res){
  var newPoll = new Poll();
  var poll = req.body;
  newPoll.name = poll.name;
  newPoll.owner = poll.owner;
  newPoll.options = poll.options;
  newPoll.voters = {};
  newPoll.save(function(err){
    if(err) return console.log(err);
    res.json(JSON.stringify(newPoll));
    User.findByIdAndUpdate(newPoll.owner,{$push:{
      polls: newPoll._id.toString()
    }},function(){});
  });
};

module.exports.fetchPolls = function(req,res){
    var category = req.query.category;
    if(category === 'user'){

    }else if(category === 'popular'){

    }
    Poll.find(function(err,polls){
      if(err) return console.error(err);
      res.json(JSON.stringify(polls));
    });
};

module.exports.votePoll = function(req,res){
  var user = req.body.user;
  var id = req.body.poll;
  var option = req.body.option;
  Poll.findById(id,function(err,poll){
    if(err || poll.options[option] === undefined) return console.log(err);
    if(poll.voters[user] !== undefined){
      poll.options[poll.voters[user]]--;
    }
    poll.voters[user] = option;
    poll.options[option]++;
    poll.markModified('voters');
    poll.markModified('options');
    poll.save(function(err,newPoll){
      if(err) return console.error(err);
      res.json(JSON.stringify(newPoll));
    });
  });
};
