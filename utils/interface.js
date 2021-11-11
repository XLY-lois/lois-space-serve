/**
 * 用于调用第三方接口
 */

const http = require('http');
const querystring = require('querystring');

function extApiGet(params, host, url) { //TODO 有bug
    return new Promise((resolve, reject) => {
        var content = querystring.stringify(params);
        var options = {
            hostname: host,
            path: url + content,
            method: 'GET'
        };
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                resolve(chunk);
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        req.end();
    })
}
module.exports = { extApiGet }