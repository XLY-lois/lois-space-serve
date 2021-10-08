const express = require('express');   //引入express模块
const bodyParser = require('body-parser')

var app = express();  //创建express的实例

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/',require('./routes/index'))
app.use('/getVisitor',require('./routes/visitor')) //获取当前访客
app.use('/',require('./routes/article')) //文章相关接口
app.use('/',require('./routes/comment')) //评论相关接口



app.listen(3000, function () {
    console.log('Server running at 3000 port');
});