const express = require('express');   //引入express模块
const bodyParser = require('body-parser')
const path = require('path')


var app = express();  //创建express的实例

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'dist')))  //将dist中的index作为首页返回

// 生产
// app.use('/api',require('./routes/visitor')) //获取当前访客
// app.use('/api',require('./routes/article')) //文章相关接口
// app.use('/', require('./routes/article')) 
// app.use('/api',require('./routes/comment')) //评论相关接口
// app.use('/api', require('./routes/exInterface')) //外部第三方接口

// 开发
app.use('/', require('./routes/visitor')) //获取当前访客
app.use('/', require('./routes/article')) //文章相关接口
app.use('/', require('./routes/article')) 
app.use('/', require('./routes/comment')) //评论相关接口
app.use('/', require('./routes/exInterface')) //外部第三方接口


app.listen(3000, function () {
    console.log('Server running at 3000 port');
});