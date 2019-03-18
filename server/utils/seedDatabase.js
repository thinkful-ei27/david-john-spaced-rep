'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');

const User = require('../models/user');
const History = require('../models/history');

const { users, history } = require('../db/data');

console.log(history);

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex : true })
  .then(() => {
    console.info('Deleting Data...');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Creating Indexes');
    return Promise.all([
      User.ensureIndexes(),
      History.ensureIndexes(),
    ]);
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      User.insertMany(users),
      History.insertMany(history),
    ]);
  })
  .then(results => {
    console.log(`Inserted results with no errors, ${results}`);
    console.info('Disconnecting...');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
