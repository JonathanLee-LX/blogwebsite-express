var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  date: Date,
  comments: [{
    body: String,
    date: Date
  }],
  praise: {
    count: Number,
    path: String
  },
  path: String
});

// 为当前mongoose添加一个model名为Article，后面可以通过mongoose.model('Article')取到该model
// mongoose.model('Article', ArticleSchema);


module.exports.ArticleSchema = ArticleSchema;