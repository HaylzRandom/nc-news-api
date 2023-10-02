const format = require('pg-format');
const db = require('../db/connection');

exports.getAllArticles = (order = 'DESC') => {
  const validSortOrder = {
    ASC: 'ASC',
    DESC: 'DESC',
    asc: 'ASC',
    desc: 'DESC',
  };

  if (!(order in validSortOrder)) {
    return Promise.reject({ status: 400, msg: 'Invalid Query Passed' });
  }

  let query = `
  SELECT a.article_id, a.author, a.title, a.topic, a.created_at, a.votes, a.article_img_url, COUNT(c.comment_id)::int as comment_count
  FROM articles a
  JOIN comments c
  ON a.article_id = c.article_id
  GROUP BY a.article_id
  ORDER BY a.created_at ${order}; 
  `;

  return db.query(query).then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      return rows.length === 0
        ? Promise.reject({ status: 404, msg: 'Article does not exist' })
        : rows[0];
    });
};