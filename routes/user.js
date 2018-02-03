var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');

router.get('/isExist', function (req, res) {
  var username = req.query.username
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) console.error(err);
    if (!user) {
      return res.send({
        isExist: false,
        info: "该用户名可以使用"
      });
    }
    res.send({
      isExist: true,
      info: "该用户名已经存在"
    });
  });
})

module.exports = router;