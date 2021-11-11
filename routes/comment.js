const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/getCommentById',function(req,res){
    console.log("/getCommentById 调用成功")
    let id = req.query.id
    handle.queryCommentByArticleId(id,result => {
        res.send(result)
    })
})

router.post('/addCommentByArticleId',function(req,res){
    console.log('/addCommentByArticleId 调用')
    console.log(req.body)
    handle.addCommentByArticleId(req.body,result => {
        let resObj = {
            code: 1,
            message: '成功',
            data: {}
        }
        res.send(resObj)
    })
})
module.exports = router