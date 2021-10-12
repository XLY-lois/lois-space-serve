const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/queryAllArticles', function (req, res) {
    console.log('/queryAllArticles 调用成功')

    handle.queryAllArticles(result => {
        let resObj = {
            code: 1,
            messge: '成功',
            data: result
        }
        res.send(resObj)
    })
})

router.post('/addArticle',function(req,res){
    console.log('/addArticle 调用成功')
    handle.addArticle(req.body,result => {
        let resObj = {
            code: 1,
            message: '成功',
            data: {}
        }
        res.send(resObj)
    })
})

module.exports = router