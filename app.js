const express = require('express');
const app = express();
const quotesRouter = require('./quotesRouter');

app.use(express.static('public'));

app.use('/api/quotes', quotesRouter);
// export app for use in main.js and for testing
module.exports = {
  app
};

