/*加载并初始化model*/
var mongoose = require('mongoose');
var ArticleSchema = require('./article.server.model').ArticleSchema;
var Article = mongoose.model('Article', ArticleSchema);
var UserSchema = require('./user.server.model').UserSchema;
var User = mongoose.model('User', UserSchema);
