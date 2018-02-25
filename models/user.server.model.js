var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  homepage: {
    type: String,
    default: '/people/'+Date.now()
  },
  avatar:{
    type: 'String',
    default: '/static/upload/avatar/default-avatar.jpg'
  },
  cover: {
    type: 'String',
    default: '/static/upload/photo/default-cover.jpg'
  }
});

module.exports.UserSchema = UserSchema;

