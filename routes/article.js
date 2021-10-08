const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/queryAllArticles', function (req, res) {
    console.log('/queryAllArticles 调用成功')

    handle.queryAllArticles(result => {
        res.send(result)
    })
})

router.post('/addArticle',function(req,res){
    console.log('/addArticle 调用成功')
    handle.addArticle(req.body)
})

module.exports = router