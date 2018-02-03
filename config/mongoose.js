var mongoose = require('mongoose');

var config = require('./config');

module.exports = function (){
  var db = mongoose.connect(config.mongodb);

  // 引入article这个model
  require('../models/article.server.model');
  console.log('has connected to mongoodb...');
  return db;
}