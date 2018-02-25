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
    res.set('Access-Control-Allow-Origin', '*');
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

router.get('/people/avatar', function (req, res) {
  User.findOne({
    username: req.session.username
  }, function (err, user) {
    if (err) console.error(err);
    if (!user) {
      res.status(404);
      return res.send({
        status: 'error',
        msg: 'Can\'t found this user'
      })
    }
    // 將用戶的avatar链接发给客户端
    res.send({
      url: user.avatar
    });
  });
});


module.exports = router;