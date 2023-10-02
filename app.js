const express = require('express');
const { getTopics } = require('./controllers/topics.controller');

const app = express();

// /api/topics
app.get('/api/topics', getTopics);

// Error Handling
app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Path Not Found' });
});

module.exports = app;