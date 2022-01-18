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
const interface = require('../utils/interface')


var connection = mysql.createConnection(mysqlconfig['dev']); //参数为当前环境 开发：dev 生产：prod
mysqlconfig.mode = 'dev'

module.exports = {
    /**
     * 访客相关
     */
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
    queryRecent: function (callback) {
        connection.query(sql.visitor.queryRecent, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            result.forEach(element => {
                element.visit_time = timeFormat.timestampFormat(element.visit_time)
            })
            callback(result)
        });

    },
    /**
     * 文章相关
     */
    queryAllArticles: function (callback) {
        connection.query(sql.article.queryAllArticles, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            connection.query(sql.tag.getTagList, function (err, tagList) {
                if (err) {
                    console.log('[SELECT ERROR]:', err.message);
                }
                result.forEach(element => {
                    element.create_time = timeFormat.timestampFormat(element.create_time)
                    element.last_edit_time = timeFormat.timestampFormat(element.last_edit_time)
                    if (element.id_tag) {
                        for (let i = 0; i < tagList.length; i++) {
                            if (element.id_tag == tagList[i].id_tag) {
                                element.name_tag = tagList[i].name_tag
                                element.color_tag = tagList[i].color_tag
                            }
                        }
                    }
                })
                callback(result)
            })
        });
    },
    queryByTagId: function (obj, callback) {
        connection.query(sql.article.queryByTagId(obj.id), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            connection.query(sql.tag.getTagList, function (err, tagList) {
                if (err) {
                    console.log('[SELECT ERROR]:', err.message);
                }
                if (result && result.length) {
                    result.forEach(element => {
                        element.create_time = timeFormat.timestampFormat(element.create_time)
                        element.last_edit_time = timeFormat.timestampFormat(element.last_edit_time)
                        if (element.id_tag) {
                            for (let i = 0; i < tagList.length; i++) {
                                if (element.id_tag == tagList[i].id_tag) {
                                    element.name_tag = tagList[i].name_tag
                                    element.color_tag = tagList[i].color_tag
                                }
                            }
                        }
                    })
                }

                callback(result)
            })
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
    likeById: function (obj, callback) {
        connection.query(sql.article.likeById(obj), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            callback(result)
        });
    },
    /**
     * 
     * 标签相关 
     */
    getTagList: function (obj,callback) {
        connection.query(sql.tag.getTagList, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            console.log(result)
            let tagList = []
            result.forEach(ele => {
                let tagObj = {
                    id:ele.id_tag,
                    text:ele.name_tag
                }
                tagList.push(tagObj)
            })
            console.log(tagList)
            callback(tagList)
        })
    },
    /**
   * 留言相关
   */
    queryCommentByArticleId: function (id, callback) {
        connection.query(sql.comment.queryCommentByArticleId(id), function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            result.forEach(element => {
                element.created_time = timeFormat.timestampFormat(element.created_time)
            })
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
    },

    /**
     * 
     * 分类列表
     */
    getClassificationList: function (callback) {
        connection.query(sql.classification.queryAll, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            }
            connection.query(sql.tag.getTagList, function (err, tagList) {
                let newArr = []
                tagList.forEach(ele => {
                    let obj = {}
                    obj.id = ele.id_tag
                    obj.class_name = ele.name_tag
                    obj.parent_id = 1
                    newArr.push(obj)
                })
                let list = [...newArr, ...JSON.parse(JSON.stringify(result))]
                let tree = (function makeTree(arr, parentId) {
                    let temp = []
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].parent_id == parentId) {
                            temp.push(arr[i])
                            arr[i].children = makeTree(arr, arr[i].id)
                        }
                    }
                    return temp
                })(list, 0)
                callback(tree)
            })
        })
    },
    /**
     * 静态资源
     */

    /**
     * 第三方接口
     */
    getLocal: function (ip) {
        let params = {
            ip,
            key: 'bcd17e8178f9ada299cb72fa41c3997f'
        }
        return new Promise((resolve, reject) => {
            interface.extApiGet(params, 'apis.juhe.cn', '/ip/ipNewV3?')
                .then(function (data) {
                    resolve(data)
                })
        })
    },
    getLocalWeather: function (city) { //好了用了两层promise ORZ... 
        let params = {
            city,
            key: '72ef8963519ebaf3937bbdd154b59659'
        }
        return new Promise((resolve, reject) => {
            interface.extApiGet(params, 'apis.juhe.cn', '/simpleWeather/query?')
                .then(function (data) {
                    resolve(data)
                })
        }) //TODO 错误处理
    }
}
