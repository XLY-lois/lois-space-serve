const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/queryAllVisitors', function (req, res) {
    handle.queryAll(result => {
        res.send(result)
    })
})

router.get('/addVisitor', function (req, res) {
    handle.addVisitor(req.query,result => {
        console.log(result)
        res.send(result)
    })
})

module.exports = router