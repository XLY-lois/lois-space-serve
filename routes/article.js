const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/', function (req, res) {
    console.log('/queryAllArticles 调用成功')

    handle.queryAllArticles(result => {
        res.send(result)
    })
})
router.get('/comment',function(req,res){
    console.log("/queryAllArticles/comment 调用成功")
    handle.queryCommentByArticleId(result => {
        res.send(result)
    })
})

module.exports = router