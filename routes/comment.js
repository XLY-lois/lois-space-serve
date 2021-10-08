const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/allComment',function(req,res){
    console.log("/allComment 调用成功")
    handle.queryCommentByArticleId(result => {
        res.send(result)
    })
})

router.get('/getCommentById',function(req,res){
    console.log("/getCommentById 调用成功")
    handle.queryCommentByArticleId(result => {
        res.send(result)
    })
})
module.exports = router