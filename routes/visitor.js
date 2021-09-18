const express = require('express')
var handle = require('../modules/handle')

let router = express.Router()

router.get('/', function (req, res) {
    // console.log(req.query)

    handle.queryAll(result => {
        console.log(result)
        res.send(result)
    })
})

module.exports = router