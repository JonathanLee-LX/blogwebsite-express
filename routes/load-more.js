var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Article = mongoose.model('Article');

router.get('/load-more', function (req, res){
  var page = req.query.page || 1;
  var size = 5;
  var skipNum = (page - 1) * size;
  Article.find({}).skip(skipNum).limit(size).exec(function (err, articles) {
    if (err) return console.log(err);
    if (!articles.length){
      return res.send({
        end: true
      });
    }
    articles.forEach(function (article, index, articles){
      article.time = article.date.toLocaleTimeString();
    })
    res.render('card', {
      abstracts: articles,
      layout: false
    });
  });
});

module.exports = router;