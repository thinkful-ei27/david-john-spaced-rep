'use strict';

const express = require('express');
const mongoose = require('mongoose');

const History = require('../models/history');
const Words = require('../models/word');

const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.post('/feedback', async (req, res, next) => {
  const { word, answer } = req.body;
  const userId = req.user.id;

  // const wordPair = testAnswers.find(wordPair => wordPair.word === word);
  try {
    const dbRes = await Words.find({word});
    const {en} = dbRes[0];
    console.log(en);
    if (en === answer) {
      const newHist = { word, userId, correct: true };
      const create = await History.create(newHist);
      res.json({
        response: 'Nice job!',
        yourAnswer: `${answer}`,
        correctAnswer: `${en}`
      })
    } else {
      const newHist = { word, userId, correct: false };
      const create = await History.create(newHist);
      res.json({
        response: `Incorrect. The correct answer is: ${en}`,
        yourAnswer: `${answer}`,
        correctAnswer: `${en}`
      });
    }
  } catch (e) {
    next(e)
  }

});

module.exports = router;