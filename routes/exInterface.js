const express = require('express')
const handle = require('../modules/handle')

let router = express.Router()
/**
 * 通过ip查天气
 */
router.get('/getWeatherByIp', function (req, res) {
    console.log('/getWeatherByIp 调用成功')
    handle.getLocal(req.query.ip)
        .then(function (result) {
            return JSON.parse(result).result.City
        })
        .then(function (city) {
            // console.log(city)
            handle.getLocalWeather(city)
                .then(function (result) {
                    let resObj = {
                        code: 1,
                        messge: '成功',
                        data: result
                    }
                    res.send(resObj)
                })
        })
})

/**
 * 查询某地天气
 */
router.get('/simpleWeather/query', function (req, res) {
    console.log('/simpleWeather/query 调用成功')

    handle.getLocalWeather(req.query.city)
        .then(function (result) {
            let resObj = {
                code: 1,
                messge: '成功',
                data: result
            }
            res.send(resObj)
        })
})
/**
 * 通过ip查询所在地
 */
router.get('/ip/ipNewV3', function (req, res) {
    console.log('/ip/ipNewV3 调用成功')
    handle.getLocal(req.query.ip)
        .then(function (result) {
            let resObj = {
                code: 1,
                messge: '成功',
                data: result
            }
            res.send(resObj)
        })
})
module.exports = router
