'use strict';

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  word: {type: String, required: true},
  username: {type: String, required: true},
  correct: {type: Number, required: true},
  incorrect: {type: Number, required: true},
});

feedbackSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);