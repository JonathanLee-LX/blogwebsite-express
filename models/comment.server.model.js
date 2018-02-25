var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema =  new mongoose.Schema({
  text: String,
  time: Date,
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reply_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  has_read:{ type: Boolean, default: false},
  create
})

module.exports.CommentSchema = CommentSchema;