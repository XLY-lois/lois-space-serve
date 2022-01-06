const express = require('express')
const handle = require('../modules/handle')
const fs = require('fs')

let router = express.Router()

router.get('/getBgImg', function (req, res) {
    console.log('/getBgImg')
    res.setHeader("Content-Type", "image");
    function randomNum(minNum, maxNum) {
        //生成 X-Y的随机数
        let num 
        switch (arguments.length) {
            case 1:
                num = parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                num = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                num = 0;
                break;
        }
        return num
    }
    let num = randomNum(1, 6);
    var content = fs.readFileSync(`../public/bgImg/bg${num}.jpg`, "binary");
    res.writeHead(200, "Ok");
    res.write(content, "binary");
    res.end();
})

module.exports = router