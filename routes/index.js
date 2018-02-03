var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function (req, res){
  if (req.session.isLogined) {
    res.render('home', {
      layout: 'logined-main',
      username: req.session.username
    })
  } else {
    res.render('home')
  }
});

module.exports = router;