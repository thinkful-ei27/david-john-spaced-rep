'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const testAnswers = [
  {word: 'hola', answer: 'hello'}
];

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.post('/feedback', (req, res, next) => {
  const { word, answer } = req.body;

  const wordPair = testAnswers.find(wordPair => wordPair.word === word);

  if (wordPair.answer === answer) {
    res.json({
      response: 'Nice job!',
      yourAnswer: `${answer}`,
      correctAnswer: `${wordPair.answer}`
    });
  } else {
    res.json({
      response: `Incorrect. The correct answer is: ${wordPair.answer}`,
      yourAnswer: `${answer}`,
      correctAnswer: `${wordPair.answer}`
    });
  }

  next();
});

module.exports = router;