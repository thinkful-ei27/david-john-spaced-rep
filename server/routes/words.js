'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Word = require('../models/word');
const User = require('../models/user');
const router = express.Router();


//put words into the database (util)
//get a single word for the frontend
//
const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));
let index = -1;
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  return User.find({_id: userId})
  .then( (_res) => (_res[0].list.filter(wordObj => wordObj.h)))
  .then (wordObj => res.json(wordObj[0].word))
});

module.exports = router;