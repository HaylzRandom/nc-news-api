const {
  selectArticleById,
  getAllArticles,
  updateArticleById,
} = require('../models/articles.model');
const { getAllCommentsForArticle } = require('../models/comments.model');

exports.getArticles = (req, res, next) => {
  const { topic, order } = req.query;

  getAllArticles(topic, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const { article_id } = req.params;
  const update = req.body;

  updateArticleById(article_id, update)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
