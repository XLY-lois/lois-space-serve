module.exports = {
    visitor: { // visitor表的语句
        queryAll: 'SELECT * FROM visitor_table',
        addVisitor: function (name) { 
            return `INSERT INTO lois_space_schema.visitor_table (name) VALUES ('${ name } ')`
        }
    },
    article: {
        queryAllArticles: 'SELECT * FROM article_table',
        queryCommentByArticleId: function (id) {
            return `SELECT * FROM lois_space_schema.comment_table where article_id = ${id}`
        },
        addArticle: function (obj) {
            return `INSERT INTO lois_space_schema.article_table(content_html, content_text, create_date, title) VALUES ('${obj.htmlContent}', '${obj.textContent}', '${obj.time}', '${obj.titleContent}')`
        }
    }
}