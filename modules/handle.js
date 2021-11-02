/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */

const timeFormat = require('../utils/time')
const mysql = require('mysql')
const mysqlconfig = require('../config/mysql')
const sql = require('./sql')

var connection = mysql.createConnection(mysqlconfig['dev']); //参数为当前环境 开发：dev 生产：prod
module.exports = {
    addVisitor: function (obj, callback) {
        console.log(obj)
        connection.query(sql.visitor.addVisitor(obj), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            //回调函数 把result扔出去
            callback(result)
        });
    },
    queryAll: function (callback) {
        connection.query(sql.visitor.queryAll, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }

            callback(result)
        });

    },
    queryAllArticles: function (callback) {
        connection.query(sql.article.queryAllArticles, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            result.forEach(element => {
                element.create_time = timeFormat.timestampFormat(element.create_time)
                element.last_edit_time = timeFormat.timestampFormat(element.last_edit_time)
            })
            callback(result)
        });
    },
    queryCommentByArticleId: function (callback) {
        connection.query(sql.article.queryCommentByArticleId('001'), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            //回调函数 把result扔出去
            callback(result)
        });
    },
    addArticle: function (obj, callback) {
        connection.query(sql.article.addArticle(obj), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            callback(result)
        });
    },
    delArticleById: function (obj, callback) {
        connection.query(sql.article.delArticleById(obj), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            callback(result)
        });
    },
    editArticleById: function (obj, callback) {
        connection.query(sql.article.editArticleById(obj), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            callback(result)
        });
    },
    queryArticleById: function (obj, callback) {
        connection.query(sql.article.queryArticleById(obj.id), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            if (result) {
                result.forEach(element => {
                    let time = Date.parse(element.create_time)
                    let dt = new Date(time)
                    element.create_time = `${dt.getFullYear()}-${(dt.getMonth() + 1)}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
                })
            }
            callback(result)
        });
    },
    addCommentByArticleId: function (obj, callback) {
        connection.query(sql.comment.addCommentByArticleId(obj), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            callback(result)
        });
    }
}
