const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/queryAllVisitors', function (req, res) {
    handle.queryAll(result => {
        res.send(result)
    })
})

router.get('/addVisitor', function (req, res) {
    console.log('/addVisitor 调用')
    let ip = req.ip.substring(7)
    handle.addVisitor(ip, result => {
        let resObj = {
            code: 1,
            messge: '成功',
            ip
        }
        res.send(resObj)
    })
})

module.exports = router