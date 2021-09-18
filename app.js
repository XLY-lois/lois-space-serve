var express = require('express');   //引入express模块

var app = express();  //创建express的实例


app.use('/',require('./routes/index'))
app.use('/getVisitor',require('./routes/visitor')) //获取当前访客
app.use('/queryAllArticles',require('./routes/article')) //获取文章



app.listen(3000, function () {
    console.log('Server running at 3000 port');
});