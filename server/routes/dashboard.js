'use strict';

const express = require('express');
const mongoose = require('mongoose');

const History = require('../models/history');

const router = express.Router();

const testAnswers = [
  {word: '¡Hola!', answer: 'hello'},
  {word: 'buenos días', answer: 'good morning'},
  {word: 'Buenas tardes', answer: 'good afternoon'},
  {word: 'Buenas noches', answer: 'goodnight'},
  {word: 'Me llamo', answer: 'my name is'},
  {word: 'Gracias', answer: 'thank you'},
  {word: 'De nada', answer: 'you are welcome'},
];

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.post('/feedback', (req, res, next) => {
  const { word, answer } = req.body;
  const userId = req.user.id;

  const wordPair = testAnswers.find(wordPair => wordPair.word === word);

  if (wordPair.answer === answer) {
    const newHist = { word, userId, correct: true };
    return History.create(newHist)
      .then(() => {
        return res.json({
          response: 'Nice job!',
          yourAnswer: `${answer}`,
          correctAnswer: `${wordPair.answer}`
        });
      })
      .catch(err => {
        next(err);
      });
  } else if (wordPair.answer !== answer) {
    const newHist = { word, userId, correct: false };
    return History.create(newHist)
      .then(() => {
        return res.json({
          response: `Incorrect. The correct answer is: ${wordPair.answer}`,
          yourAnswer: `${answer}`,
          correctAnswer: `${wordPair.answer}`
        });
      })
      .catch(err => {
        next(err);
      });
  } else {
    return next();
  }
});

module.exports = router;