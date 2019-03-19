'use strict';

const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {type: String, required: true},
  en: {type: String, required: true},
});

wordSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});


module.exports = mongoose.model('Word', wordSchema);