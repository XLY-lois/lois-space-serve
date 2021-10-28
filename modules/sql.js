module.exports = {
    visitor: { // visitor表的语句
        queryAll: 'SELECT * FROM visitor_table',
        addVisitor: function (ip) {
            return `INSERT INTO lois_space_schema.visitor_table (ip) VALUES ('${ip} ')`
        }
    },
    article: {
        // queryAllArticles: 'SELECT * FROM article_table',
        queryAllArticles: 'SELECT * FROM article_table where status = 0 order by create_time desc limit 10',
        queryCommentByArticleId: function (id) {
            return `SELECT * FROM lois_space_schema.comment_table where article_id = ${id}`
        },
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
    }
}