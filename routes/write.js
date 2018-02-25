var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/write', function (req, res){
  if (req.session.isLogined) {
    // 通过username可以从users中找到该user对象
    User.findOne({username: req.session.username}).exec(function (err, user){
      if(err) console.error(err);
      if(!user) console.log('Can\'t found this user');
      res.render('write', {
        layout: 'logined-main',
        username: user.username, // 回话中存储这用户名
        avatar: user.avatar,
        homepage: user.homepage
      })
    })
  } else {
    res.render('write')
  }
})

module.exports = router;