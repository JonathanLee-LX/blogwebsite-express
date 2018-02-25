var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');

router.get('/login', function (req, res){
  // 如果已经登录，直接跳转到主页
  if (req.session.isLogined) {
    return res.redirect('/')
  }
 
  if(req.query.type === 1){
    return res.render('login-comp',{
      layout: false
    })
  }
  
  res.render('login', {
    layout: 'no-nav'
  })
});

router.post('/login', function (req, res){
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, function (err, user) {
    if (err) console.error(err);
    if (!user) {
      return res.status(403).send("用户名或者密码错误");
    }
    req.session.isLogined = true;
    req.session.username = user.username;
    res.send({
      url: '../'
    });
  });
});

module.exports = router;