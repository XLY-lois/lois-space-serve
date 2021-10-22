const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/queryAllVisitors', function (req, res) {
    handle.queryAll(result => {
        res.send(result)
    })
})

router.get('/addVisitor', function (req, res) {
    handle.addVisitor(req.query, result => {
        let resObj = {
            code: 1,
            messge: '成功',
            data: result
        }
        res.send(resObj)
    })
})

module.exports = router