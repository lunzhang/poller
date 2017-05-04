var mongoose = require('mongoose');
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');

module.exports.login = function (req, res) {
  if(req.body.type === 'FB'){
    User.findOne({fbId: req.body.fbId},function(err, user) {
      if (err) { return err; }
      if (user) {
        res.json(JSON.stringify(user));
      }
      else {
        var newUser = new User();
        newUser.pictureURL = req.body.pictureURL;
        newUser.fbId = req.body.fbId;
        newUser.loginType = req.body.type;
        newUser.name = req.body.name;
        newUser.detail = 'I like to vote!'
        newUser.save(function (err) {
          res.json(JSON.stringify(newUser));
        });
      }
    });
  }
};

module.exports.updateProfile = function(req,res){
  User.update({_id: req.body.id}, { $set:{
    name: req.body.name,
    detail: req.body.detail
  }}, function(err,doc){
    res.sendStatus(200);
  });
};

module.exports.fetchUser = function(req,res){
    var id = req.query.id;
    User.findById(id,function(err,user){
        if(err) return res.sendStatus('400');
        Poll.find({owner:id},function(err,polls){
          if(err) return res.sendStatus('400');
          res.json(JSON.stringify({
            user:user,
            polls:polls
          }));
        });
    });
};
