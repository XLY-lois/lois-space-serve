const express = require('express')
var handle = require('../modules/handle')
var multiparty = require("multiparty");
const fs = require('fs')

let router = express.Router()

router.get('/queryAllArticles', function (req, res) {
    console.log('/queryAllArticles 调用成功')
    handle.queryAllArticles(result => {
        let resObj = {
            code: 1,
            messge: '成功',
            data: result
        }
        res.send(resObj)
    })
})
router.get('/queryArticleById', function (req, res) {
    console.log('/queryArticleById 调用成功')
    handle.queryArticleById(req.query, result => {
        let resObj = {
            code: 1,
            messge: '成功',
            data: result
        }
        res.send(resObj)
    })
})
router.post('/addArticle', function (req, res) {
    console.log('/addArticle 调用成功')
    handle.addArticle(req.body, result => {
        let resObj = {
            code: 1,
            message: '成功',
            data: {}
        }
        res.send(resObj)
    })
})
router.post('/delArticleById', function (req, res) {
    handle.delArticleById(req.body, result => {
        let resObj = {
            code: 1,
            message: '成功',
            data: {}
        }
        res.send(resObj)
    })
})
router.post('/editArticleById', function (req, res) {
    console.log('/editArticleById 调用')
    handle.editArticleById(req.body, result => {
        let resObj = {
            code: 1,
            message: '成功',
            data: {}
        }
        res.send(resObj)
    })
})
router.post('/uploadImg', function (req, res) {
    console.log('/uploadImg 调用')
    let form = new multiparty.Form({ uploadDir: './public/articleImg', keepExtensions: true })
    form.parse(req, function (err, fields, files) {
        var uploadedPath
        var dstPath
        var fileName
        if (err) {
            console.log(err)
        } else {
            for (let key in files) {
                let val = files[key]
                console.log(val[0])
                uploadedPath = val[0].path
                fileName = val[0].originalFilename
                dstPath = './public/articleImg/' + val[0].originalFilename;
            }
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }
        res.send({ //TODO 上传图片后的回显地址
            "errno": 0,
            "data": [
                {
                    url: 'http://127.0.0.1:3000/public/articleImg/' + fileName,
                    alt: "图片文字说明",
                    href: "跳转链接"
                }
            ]
        });
    });
})
router.get('/public/articleImg/:img', function (req, res) {
    res.setHeader("Content-Type", "image");
    var content = fs.readFileSync('./public/articleImg/'+req.params.img, "binary");
    res.writeHead(200, "Ok");
    res.write(content, "binary");
    res.end();
})
router.get('/likeById', function (req, res) {
    console.log('/likeById 调用成功')
    let obj = {
        type: 'add',
        email: '123@123.com',
        articleId: '31'
    }//req.query
    handle.likeById(obj, result => {
        let resObj = {
            code: 1,
            messge: '成功',
            data: result
        }
        res.send(resObj)
    })
})
module.exports = router