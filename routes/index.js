var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');

/* GET Home page. */
router.get('/', function (req, res){
  if (req.session.isLogined) {
    User.findOne({
      username: req.session.username
    }, function (err, user){
      // console.log(user);
      res.render('home', {
        layout: 'logined-main',
        username: user.username,
        avatar: user.avatar,
        homepage: user.homepage
      });
    });
  } else {
    res.render('home');
  }
});

module.exports = router;