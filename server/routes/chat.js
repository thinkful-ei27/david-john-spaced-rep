'use strict';

const express = require('express');

const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.get("/chat", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;