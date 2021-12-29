module.exports = {
    visitor: { // visitor表的语句
        queryAll: 'SELECT * FROM visitor_table',
        addVisitor: function (obj) {
            return `INSERT INTO lois_space_schema.visitor_table (ip, name, email) VALUES ('${obj.ip} ','${obj.name} ','${obj.email} ')`
        }
    },
    article: {
        queryAllArticles: 'SELECT * FROM article_table where status = 0 order by create_time desc limit 10',
        addArticle: function (obj) {
            return `INSERT INTO lois_space_schema.article_table(content_html, content_text, title) VALUES ('${obj.htmlContent}', '${obj.textContent}', '${obj.titleContent}')`
        },
        delArticleById: function (obj) {
            let sql = ''
            obj.idArr.forEach(element => {
                sql += `UPDATE lois_space_schema.article_table SET status = 1 WHERE id = ${element};`
            });
            return sql
        },
        editArticleById: function (obj) {
            return `UPDATE lois_space_schema.article_table SET content_html = '${obj.htmlContent}', content_text = '${obj.textContent}', title='${obj.titleContent}' WHERE id = ${obj.id};`
        },
        queryArticleById: function (id) {
            return `SELECT * FROM lois_space_schema.article_table WHERE id = ${id}`
        },
        queryByTagId: function(id) {
            return `SELECT * FROM lois_space_schema.article_table WHERE id_tag = ${id} and status = 0 order by create_time desc limit 10`
        }
    },
    comment: {
        queryCommentByArticleId: function (id) {
            return `SELECT * FROM lois_space_schema.comment_table where article_id = ${id}`
        },
        addCommentByArticleId: function (obj) {
            return `INSERT INTO lois_space_schema.comment_table(article_id, name, comment_content, email) VALUES ('${obj.articleId}', '${obj.name}', '${obj.content}', '${obj.email}')`
        }
    },
    classification: {
        queryAll: `SELECT * FROM lois_space_schema.classification_table`,
        queryById: function(id){
            return `SELECT * FROM lois_space_schema.classification_table WHERE id = ${id}`
        } 
    },
    tagList: {
        queryAll: `SELECT * FROM lois_space_schema.tag_table`
    }
}