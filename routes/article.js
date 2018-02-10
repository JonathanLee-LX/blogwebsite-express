var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

router.get('/article\/[a-zA-Z0-9]+\/praise/', function (req, res){
  var path = req.url;
  Article.findOne({
    'praise.path': path
  }, function (err, article) {
    if (err) console.error(err);
    if(!article){
      res.status(404);
      return res.send({
        status: 'error',
        message: 'Can\'t found this article'
      });
    }
    article.praise.count++;
    res.send({
      status: "ok",
      count: article.praise.count
    })
    article.save(function (err) {
      if (err) console.error(err);
    });
  });
});

router.get('/article\/[a-zA-Z0-9]+/', function (req, res){
  Article.findOne({
    path: req.url
  }, function (err, article) {
    if(err) console.error(err);
    if (!article) {
      res.status(404);
      return res.send({
        status: 'error',
        message: 'Can\'t found this article!'
      });
    }
    console.log(article);
    if(req.session.isLogined){
      res.render('article', {
        title: article.title,
        body: article.body,
        author: article.author,
        time: new Date(article.date).toLocaleDateString(),
        layout: 'logined-main',
        username: req.session.username,
      });
    }else{
      res.render('article', {
        title: article.title,
        body: article.body,
        author: article.author,
        time: article.date,
        layout: 'main'
      });
    }
  });
});

router.post('/receiveArticle', function (req, res){
  if (!req.session.isLogined) {
    // 没有登录重定向到登录页面
    return res.redirect('/login')
  }
  var article = new Article({
    title: req.body.title,
    body: req.body.article,
    author: req.session.username,
    date: new Date(),
    comments: [],
    praise: {
      count: 0,
      path: '/article/' + Date.now() + '/praise',
    },
    path: '/article/' + Date.now()
  });
  article.save(function (err, article) {
    if (err) return console.error(err);
    res.redirect(article.path);
  });
});

module.exports = router;