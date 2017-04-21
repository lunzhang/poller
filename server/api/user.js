var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function (req, res) {

  User.findOne({ id: req.body.id },{'_id':0,'__v':0},function(err, user) {
    if (err) { return err; }
    if (user) {
      res.json(JSON.stringify(user));
    }
    else {
      var newUser = new User();
      newUser.id = req.body.id;
      newUser.name = req.body.name;
      newUser.detail = 'I like to vote!'
      newUser.save(function (err) {
        var data = newUser.toObject();
        delete data['_id'];
        delete data['__v'];
        res.json(JSON.stringify(data));
      });
    }
  });

};

module.exports.updateProfile = function(req,res){
  User.update({id: req.body.id}, { $set:{
    name: req.body.name,
    detail: req.body.detail
  }}, function(err,doc){
      res.sendStatus(200);
  });
};
