'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const socketIo = require('socket.io');
const wordArr = [{},{}];

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

// Routers
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const wordsRouter = require('./routes/words');
const historyRouter = require('./routes/history');
const listRouter = require('./routes/list');
const chatRouter = require('./routes/chat');
const chatApp = express();
const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Parse request body
app.use(express.json());

// Configure passport to utilize strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/words', wordsRouter);
app.use('/api/history', historyRouter);
app.use('/api/list', listRouter);
app.use('/api', authRouter);
chatApp.use('/api/chat', chatRouter);

// app.get('/api/chat', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })


// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
const chatServer = http.createServer(chatApp).listen(4010);
const io = socketIo(chatServer);

io.on('connection', (client) => {
  console.log('connected');
  client.on('logMe', (interval) => {
    console.log('LogMe logged! HELL YEAHH!');
    client.emit('I-logged');
  });
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
  
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
