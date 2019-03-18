'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Word = require('../models/word')
const router = express.Router();


//put words into the database (util)
//get a single word for the frontend
//
// const passport = require('passport');
// router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));
let index = -1;
router.get('/', (req, res, next) => {
  if (index > 5) {
    index = 0;
  } else {
    index = index + 1
  }
  return Word.find()
    .then( (_res) =>
    res.json({
      word: _res[index]
    }));
});

module.exports = router;