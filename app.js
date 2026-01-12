const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const quote = {
    quote: getRandomElement(quotes)
  }
  res.send(quote);
});

app.get('/api/quotes', (req, res, next) => {
  const author = req.query.person;
  const id = req.query.id;
  if(!author && !id) {
    const allQuotes = {
    quotes: quotes
  }
    res.send(allQuotes);
  
  } else if (author && !id) {
    const filteredQuotes = quotes.filter (auth => {
      return auth.person === author;
    });
      const quotesToSend = {
      quotes: filteredQuotes
      };
     res.send(quotesToSend);
   } else if (!author && id) {
    const filteredQuotes = quotes.filter (quote => {
      return quote.id === Number(id);
    });
      const quotesToSend = {
      quotes: filteredQuotes
      };
     res.send(quotesToSend);
   }
  
});


app.post('/api/quotes', (req, res, next) => {
  const newPerson = req.query.person;
  const newQuote = req.query.quote;
  if(newPerson && newQuote) {
    const fullThing = {person: newPerson, quote:newQuote, id: quotes.length + 1};
    quotes.push(fullThing);
    const toSendBack = {
      quote: fullThing
    };
    res.status(201).send(toSendBack);
  } else {
    res.status(400).send();
  };
});

app.put('/api/quotes', (req, res, next) => {
  const id = Number(req.query.id);
  const newQuoteText = req.query.quote;  
  const newPerson = req.query.person;

  const quoteToUpdate = quotes.find(q => q.id === id);

  if (!quoteToUpdate) {
    return res.status(404).send({ error: 'Quote not found' });
  }

  if (!newQuoteText && !newPerson) {
    return res.status(400).send({ error: 'At least one field (quote or person) must be provided' });
  }

  if (newQuoteText) quoteToUpdate.quote = newQuoteText;
  if (newPerson) quoteToUpdate.person = newPerson;

  res.send({ quote: quoteToUpdate });
});

app.delete('/api/quotes', (req, res, next) => {
  const id = Number(req.query.id);

  const quoteIndex = quotes.findIndex(q => q.id === id);

  if (quoteIndex === -1) {
    return res.status(404).send({ error: 'Quote not found' });
  }

  const deletedQuote = quotes.splice(quoteIndex, 1)[0];

  res.send({ quote: deletedQuote });
});


// export app for use in main.js and for testing
module.exports = {
  app
};

