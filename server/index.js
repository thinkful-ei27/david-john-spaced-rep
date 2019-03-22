'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

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

/////////////////////////////////////Chat server///////////////////////////////////////////////////////////////////////////////
let waitForAnswer = false;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

function emitQuestion() {
  arrIndex = Math.floor(Math.random() * questionAnswerArr.length);
  const questionAnswerObj = questionAnswerArr[arrIndex];
  console.log('Outputting question', questionAnswerObj.question, ' to all clients');
  const outputObj = {type: 'server', userName: 'server',
    value: `What is the english translation for ${questionAnswerObj.question}?`,
    answer: questionAnswerObj.answer};
  io.sockets.emit('question', outputObj);
  waitForAnswer = true;
}
let interval = setInterval(emitQuestion, 20000);

let scoreObjArr = [];
function addScore(name) {
  console.log("addscore called!")
  for (let i = 0; i < scoreObjArr.length; i++) {
    console.log("found the username")
    if (scoreObjArr[i].username == name) {
      scoreObjArr[i].score = scoreObjArr[i].score + 1
      console.log(scoreObjArr[i].score)
      return scoreObjArr[i].score
    }
  }
  console.log("didn't find a username, so pushing one on")
  scoreObjArr.push({ score : 1, username: name });
  return 1
}
let questionAnswerArr = [
  {question: '¡Hola!', answer: 'hello'},
  {question: 'buenos días', answer: 'good morning'},
  {question: 'Buenas tardes', answer: 'good afternoon'},
  {question: 'Buenas noches', answer: 'good night'},
  {question: 'Me llamo', answer: 'my name'},
  {question: 'Gracias', answer: 'thank you'},
  {question: 'De nada', answer: 'you are welcome'},
  {question: 'Como siempre', answer: 'as always'},
  {question: '¿Cómo estás?', answer: 'how are you?'},
  {question: 'Lo siento', answer: 'im sorry'},
  {question: 'Te amo', answer: 'i love you'},
  {question: 'Necesito ayuda', answer: 'i need help'},
  {question: 'adiós', answer: 'goodbye'},
  {question: 'Feliz Navidad', answer: 'merry christmas'},
  {question: 'Perdón', answer: 'excuse me'},
  {question: 'muy bien', answer: 'very well'},
  {question: 'Feliz cumpleaños', answer: 'happy birthday'},
  {question: 'No sé', answer: 'i dont know'},
  {question: 'Buen trabajo', answer: 'good job'},
];
let arrIndex = Math.floor(Math.random() * questionAnswerArr.length);
io.sockets.on('connection', (client) => {
  console.log('connected');

  client.on('logMe', (input) => {
    let outputObject;
    console.log('logMe logged');
    if (input.input.toLowerCase() === questionAnswerArr[arrIndex].answer && waitForAnswer) { //correct answer
      console.log('emmiting answer');
      waitForAnswer = false;
      const score = addScore(input.username)
      outputObject = {type: 'answer', userName: input.username, value: input.input, score};
      clearInterval(interval);
      setTimeout(emitQuestion, (Math.random() * 1000) + 1000);
      interval = setInterval(emitQuestion, 35000);
    } else { //incorrect, or we didn't ask a question so... redundant
      outputObject = {type: 'message', userName: input.username, value:input.input};
    }
    io.sockets.emit('I-logged', outputObject);
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function runServer(port = PORT) {
  server
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