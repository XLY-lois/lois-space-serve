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
    let obj = req.query
    let ip = req.ip.substring(7)
    handle.addVisitor({...obj, ip}, result => {
        let resObj = {
            code: 1,
            messge: '成功',
        }
        res.send({...resObj,ip})
    })
})

module.exports = router