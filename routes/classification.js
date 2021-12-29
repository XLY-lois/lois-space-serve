const express = require('express')
const handle = require('../modules/handle')

let router = express.Router()

router.get('/getClassificationList',function(req,res){ //获取分类列表
    console.log("/getClassificationList 调用成功")
    handle.getClassificationList( result => {
        res.send(result)
    })
})
module.exports = router