const express = require("express");
const { getRandomElement } = require("./utils");
const quotes = require("./data").quotes;
const quotesRouter = express.Router();

quotesRouter.get("/random", (req, res, next) => {
  res.send({ quote: getRandomElement(quotes) });
});

quotesRouter.get("/", (req, res, next) => {
  const author = req.query.person;
  const id = req.query.id;
  if (!author && !id) {
    res.send({ quotes: quotes });
  } else if (author && !id) {
    const filteredQuotes = quotes.filter((auth) => {
      return auth.person === author;
    });
    res.send({ quotes: filteredQuotes });
  } else if (!author && id) {
    const filteredQuotes = quotes.filter((quote) => {
      return quote.id === Number(id);
    });

    res.send({ quotes: filteredQuotes });
  }
});
quotesRouter.post("/", (req, res, next) => {
  const newPerson = req.query.person;
  const newQuote = req.query.quote;
  if (newPerson && newQuote) {
    const fullThing = {
      person: newPerson,
      quote: newQuote,
      id: quotes.length + 1,
    };
    quotes.push(fullThing);
    res.status(201).send({ quote: fullThing });
  } else {
    res.status(400).send();
  }
});

quotesRouter.put("/", (req, res, next) => {
  const id = Number(req.query.id);
  const newQuoteText = req.query.quote;
  const newPerson = req.query.person;

  const quoteToUpdate = quotes.find((q) => q.id === id);

  if (!quoteToUpdate) {
    return res.status(404).send({ error: "Quote not found" });
  }

  if (!newQuoteText && !newPerson) {
    return res
      .status(400)
      .send({ error: "At least one field (quote or person) must be provided" });
  }

  if (newQuoteText) quoteToUpdate.quote = newQuoteText;
  if (newPerson) quoteToUpdate.person = newPerson;

  res.send({ quote: quoteToUpdate });
});

quotesRouter.delete("/", (req, res, next) => {
  const id = Number(req.query.id);
  const quoteIndex = quotes.findIndex((q) => q.id === id);

  if (quoteIndex === -1) {
    return res.status(404).send({ error: "Quote not found" });
  }
  const deletedQuote = quotes.splice(quoteIndex, 1)[0];
  res.send({ quote: deletedQuote });
});

module.exports = quotesRouter;
