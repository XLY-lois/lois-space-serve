const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/', function (req, res) {
    console.log('收到请求')

    handle.queryAll(result => {
        res.send(result)
    })
})

module.exports = router