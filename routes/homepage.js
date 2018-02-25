var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get(/\/people\/.*/, function (req, res){
  User.findOne({
    homepage: req.url
  }, function(err, user){
    if(err) console.error(err);
    if(!user){
      res.status(404);
      return res.send({
        status: 'error',
        msg: 'Can\'t found this homepage'
      })
    }
    res.render('homepage', {
      layout: 'homepage-layout',
      avatar: user.avatar,
      cover: user.cover
    });
  });
} );

module.exports = router;