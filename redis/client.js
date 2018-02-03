// redis模块是一个连接redis缓存数据库的nodejs模块
var config = require('./config/config.js'),
    redis = require('redis'),
    client = redis.createClient(config.redis);
    
    module.exports = client;