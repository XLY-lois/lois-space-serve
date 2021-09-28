module.exports = {
    visitor: { // visitor表的语句
        queryAll: 'SELECT * FROM visitor_table'
    },
    article: {
        queryAllArticles: 'SELECT * FROM article_table',
        queryCommentByArticleId: function(id) {
            return `SELECT * FROM lois_space_schema.comment_table where article_id = ${id}`
        }
    }
}