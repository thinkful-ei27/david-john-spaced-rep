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
router.get('/', (req, res, next) => {
  return Word.find()
    .then( (_res) =>
    res.json({
      word: _res[1]
    }));
});

module.exports = router;