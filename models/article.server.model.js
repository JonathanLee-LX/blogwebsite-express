var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new mongoose.Schema({
  title: String,  // 文章标题
  body: String, //  文章主体内容
  author: { type: Schema.Types.ObjectId, ref: 'User'}, // 对象形式的作者
  date: Date,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
   }],
  praise: {
    count: Number, // 点赞数
    voters: Array, // 投票者
    path: String  
  },
  path: String
});

// 为当前mongoose添加一个model名为Article，后面可以通过mongoose.model('Article')取到该model
// mongoose.model('Article', ArticleSchema);

module.exports.ArticleSchema = ArticleSchema;