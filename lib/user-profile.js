var mongoose = require('mongoose');
var User = mongoose.model('User');


var updateUserAvatar = function (req, res) {
  User.findOne({
    username: req.session.username
  }, function (err, user) {
    user.avatar = req.session.avatar;
    user.save(function (err) {
      if (err) console.error(err);
      console.log('has update user\'s avatar');
    });
    res.send({
      url: user.avatar
    });
  })
}

module.exports.updateUserAvatar = updateUserAvatar;