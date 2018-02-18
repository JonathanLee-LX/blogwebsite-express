var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookie_parser = require('cookie-parser');
var credentials = require('./credentials/credentials');
var mongoose = require('./config/mongoose');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = require('./redis/client.js');
var exphbs = require('express-handlebars');

// 初始化所有的model
var models = require('./models/init-model.js');

var index = require('./routes/index'); 
var login = require('./routes/login'); 
var register = require('./routes/register'); 
var write = require('./routes/write'); 
var article = require('./routes/article'); 
var load_more = require('./routes/load-more'); 
var upload = require('./routes/upload'); 
var user = require('./routes/user'); 

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('trust proxy', 1)
// exphbs.create(option)创建一个hbs的实例
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
});
//app.engine(name, object)设置渲染引擎
app.engine('handlebars', hbs.engine);
//app.set(name, value) 设置视图引擎'view engine', value为前面engine方法指定的引擎名，注意一定是字符串形式
app.set('view engine', 'handlebars');
var db = mongoose();
//通过一个redis-client初始化一个redis存储对象
var store = new RedisStore({
  client: client
});


// 将静态文件的根目录设为 __dirname+'/public'
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookie_parser(credentials.cookieSecret));
app.use(session({
  store: store,
  secret: credentials.cookieSecret,
  resave: true,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  name: 'session_id',
  rolling: true, //强制每次响应都重新发送一个cookie，并重置cookie的maxAge属性，默认是false
  saveUninitialized: false //默认为true，会在接收每次请求时，无论该请求是否带有一个存储session的cookie，都会重新设置一个session的cookie
}));

app.use(index);
app.use(login);
app.use(register);
app.use(write);
app.use(article);
app.use(upload);
app.use(user);
app.use(load_more);


var debug = require('debug')('demo:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;