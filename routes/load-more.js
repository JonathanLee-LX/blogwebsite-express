var express = require('express');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var router = express.Router();
var Article = mongoose.model('Article');

router.get('/load-more', function (req, res) {
  var page = req.query.page || 1;
  var size = 8;
  var skipNum = (page - 1) * size;
  Article.find({}).skip(skipNum).limit(size).exec(function (err, articles) {
    if (err) return console.error(err);
    if (!articles.length) {
      return res.send({
        end: true
      });
    }

    // 包装article对象
    articles.forEach(function (article, index, articles) {
      var img_src, img;
      var body = '<div class=\'body\'>'+article.body + '</div>'
      // 使用cheerio解析这段html字符串
      var $ = cheerio.load(body);
      var $imgs = $("img[data-jlx='img']");
      // console.log($imgs);
      var img_src = $imgs.length > 0 ? $imgs[0].attribs.src : '' ;
      if(img_src){
        img = '<img src="' + img_src + '" class="preview-img"/>';
      }else{
        img = '';
      }

      //获取文本内容,限定221个字符
      var text = $.text().substring(0, 211) + '...';

      var isVoted = article.praise.voters.some(function (voter, index) {
        if (voter === req.session.username) {
          return true;
        }
      });

      article.time = article.date.toLocaleTimeString();
      article.img = img;
      article.text = text;
      // isVoted表示该用户是否已经投过票了
      article.praise.isVoted = isVoted ? isVoted : false;
    })

    res.render('card', {
      abstracts: articles,
      layout: false
    });
  });
});

module.exports = router;