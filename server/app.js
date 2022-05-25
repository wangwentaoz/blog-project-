var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const {PRIVATE_KEY} = require('./utils/constant')
var artRouter = require('./routes/article');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');
const {expressjwt} = require('express-jwt')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());  // 允许所有网址都可以进行跨域
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjwt({
  secret: PRIVATE_KEY,
  algorithms: ['HS256']
}).unless({
  path: ['/api/user/register','/api/user/login','/api/user/upload','/api/article/allList','/api/article/detail','/api/comment/list']  //白名单,除了这里写的地址，其他的URL都需要验证
}));
app.use('/api/article', artRouter);
app.use('/api/user', usersRouter);
app.use('/api/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err.name == 'UnauthorizedError'){
    // 根据自己的业务逻辑进行处理
    res.status(401).send({code:-1, msg:'token验证失败'})
  }else{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
