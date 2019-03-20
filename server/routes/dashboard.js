'use strict';

const express = require('express');
const mongoose = require('mongoose');
const spacedRep = require('../utils/spacedRep');

const History = require('../models/history');
const Words = require('../models/word');
const User = require('../models/user');

// To build linked list
const {LinkedList, display, swapNodes} = require('../linkedList/linkedList');
const { spacedRepLL, listFromObj} = require ('../utils/spacedRep');

const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

const transformList = (listObj, feedback) => {
  // Extract list
  // Turn list obj into linked list
  // run through spaced rep algo
  // return stringify linked list
  console.log('to start: list obj is ', listObj);
  console.log('to start: feedback is ', feedback);
  const ll = new LinkedList();
  console.log('we have a ll', ll);
  listFromObj(listObj, ll);
  console.log('linked list is now', ll);
  spacedRepLL(ll, feedback);
  console.log('we have a new list ', ll);
  return ll;
}

router.post('/feedback', async (req, res, next) => {
  const { word, answer } = req.body;
  const userId = req.user.id;

  // const wordPair = testAnswers.find(wordPair => wordPair.word === word);
  try {
    const dbRes = await Words.find({word});
    const {en} = dbRes[0];
    if (en === answer) {
      const newHist = { word, userId, correct: true };
      const create = await History.create(newHist);
      const getList = await User.findOne({_id: userId}).exec();
      const transform = await transformList(getList.list[0], newHist);
      console.log(transform);
      const newList = await User.findOneAndUpdate({_id: userId}, {list: transform})
      // console.log(spacedRep(getList.list, newHist));
      res.json({
        response: 'Nice job!',
        yourAnswer: `${answer}`,
        correctAnswer: `${en}`,
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