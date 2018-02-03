var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/register', function (req, res){
  res.render('register');
});

router.post('/register', function (req, res){
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function (err) {
    if (err){
      console.error(err);
      res.status('500');
      return res.send({
       status: 'error',
       message: 'Interval error'
     })
    }
    req.session.isLogined = true;
    req.session.username = user.username;
    res.redirect('/');
  });
});

module.exports = router;