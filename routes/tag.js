const express = require('express')
const handle = require('../modules/handle')

let router = express.Router()
router.get('/getTagList', function (req, res) {
    console.log('/getTagList 调用成功')
    handle.getTagList(req.query, result => {
        let resObj = {
            code: 1,
            messge: '成功',
            data: result
        }
        res.send(resObj)
    })
})
module.exports = router