'use strict';

const express = require('express');
const mongoose = require('mongoose');

const History = require('../models/history');

const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const userId = req.user.id;

  History.find({userId})
    .sort('word')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET PROGRESS BY WORD ========== */
router.get('/progress', (req, res, next) => {
  const userId = req.user.id;
  const {word} = req.query;

  History.find({userId, word})
    .then(items => {
      const trueAns = items.filter(item => item.correct).length;
      const falseAns = items.filter(item => !item.correct).length;
      const percentage = Math.floor(trueAns / (items.length) * 100);
      const obj = {
        trueAns,
        falseAns,
        percentage
      };
      res.json(obj);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { word, correct } = req.body;
  const userId = req.user.id;

  const newHist = { word, userId, correct };

  /***** Never trust users - validate input *****/
  if (!word) {
    const err = new Error('Missing `word` in request body');
    err.status = 400;
    return next(err);
  }

  History.create(newHist)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Word name already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;