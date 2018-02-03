var express = require('express');
var router = express.Router();

router.get('/write', function (req, res){
  if (req.session.isLogined) {
    // 通过username可以从users中找到该user对象
    res.render('write', {
      layout: 'logined-main',
      username: req.session.username // 回话中存储这用户名
    })
  } else {
    res.render('write')
  }
})

module.exports = router;