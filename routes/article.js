var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');

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
        message: 'Can\'t found this article.'
      });
    }
    // 判断该用户是否已经点赞
    var isVoted = article.praise.voters.some(function (voter, index){
      if(voter === req.session.username){
        // 将该用户从点赞用户数组中删除
        // console.log(article.praise.voters)
        article.praise.voters.splice(index, 1);
        // console.log(article.praise.voters)
        return true;
      }
    });
    // 该用户已经点过赞了，取消上次的点赞
    if(isVoted){
      res.send({
        status: 'ok',
        type: -1,
        count: --article.praise.count
      });
    }else{
      // 该用户没有进行投票，可以进行投票
      article.praise.voters.push(req.session.username);
      article.praise.count++;
      res.send({
        status: "ok",
        type: 1,
        count: article.praise.count
      })
    }
    // 保存该article对象
    article.save(function (err) {
      if (err) console.error(err);
    });

  });
});

// 文章详情路由
router.get('/article\/[a-zA-Z0-9]+/', function (req, res){
  Article.findOne({path: req.url})
  .populate('author')
  // .populate('comments.user')
  // .populate('comments.to')
  .exec(
    function (err, article) {
      if (err) console.error(err);
      if (!article) {
        res.status(404);
        return res.send({
          status: 'error',
          message: 'Can\'t found this article!'
        });
      }
      if (req.session.isLogined) {
        // 如果该用户已经登录，获取该用户的信息

        User.findOne({username: req.session.username}).exec(
          function (err, user){
            if(err) console.error(err);
            if(!user) return res.send({status: 404, msg: 'Can\'t found this user'})
            
            // console.log(article.comments);

            res.render('article', {
              title: article.title,
              body: article.body,
              author: article.author,
              time: new Date(article.date).toLocaleDateString(),
              layout: 'logined-main',
              username: user.username,
              avatar: user.avatar,
              homepage: user.homepage,
              // 
              comments: article.comments,
            });

          }
        )
      } else {
        res.render('article', {
          title: article.title,
          body: article.body,
          author: article.author,
          time: article.date,
          layout: 'main'
        });
      }
    }
  );
});

router.get('/article\/[a-zA-Z0-9]+/comment', function (req, res){
  Article.findOne({path: req.url}).exec(function (err, article){
    User.findOne({username: req.session.username}).exec(function (err, user){
      if(err) console.error(err);
      if(!user) console.log('has\'t found this user');
      var postUser = user; // 发表评论的用户

      User.findOne({username: req.query.to}).exec(function (err, user){
        if(err) console.error(err);
        if(!user) console.log('has\'t found this user');
        var getUser = user; // 收到该评论的用户

        //创建一个comment对象用于添加
        var comment = {
          text: req.body.comment,
          time: new Date(),
          user: postuser._id,  // 发表评论的用户
          to: getuser._id      // 回复的用户
        };

        article.comments.push(comment);

      });
    });
  });
})

// router.get('/article\/[a-zA-Z0-9]+/get-comment', function (req, res){
//   Article.
// })

router.post('/receiveArticle', function (req, res){
  if (!req.session.isLogined) {
    // 没有登录重定向到登录页面
    return res.redirect('/login')
  }
  User.findOne({
    username: req.session.username
  }, function (err, user){
    if(err) console.error(err);
    if(!user) return res.send('Can\'t found this user');

    // 建立user和article之间的引用
    var article = new Article({
      title: req.body.title,
      body: req.body.article,
      author: user._id,  // 引用该user对象
      date: new Date(),
      comments: [],
      praise: {
        count: 0,
        voters: [],
        path: '/article/' + Date.now() + '/praise',
      },
      path: '/article/' + Date.now()
    });
    
    article.save(function (err, article) {
      if (err) return console.error(err);
      res.redirect(article.path);
    });

  });
});

module.exports = router;