'use strict';

const users = [
  {  '_id': '222222222222222222222200',
    'firstName': 'Johnny',
    'lastName': 'Salt',
    'username': 'johnnysalt',
    'password': '$2a$10$F3WxoCmNFelMJuUbFMTXWO.nrEhQg1GNfuwgItE3l6fb8Bfso0cLa'
  },
  {
    '_id': '333333333333333333333300',
    'firstName': 'Bob',
    'lastName': 'User',
    'username': 'bobuser',
    // hash digest for the string 'password'
    'password': '$2a$10$0S5GdCkGJTDeaAH272/bmeZmmpC4rv6ItXIOZKwVQIfQOqSURhkhu'
  },
  {
    '_id' : '5c3f5ca9ec37422f44bdaa82',
    'firstName': 'thejohnny',
    'lastName': 'salt',
    'username' : 'thejohnnysalt',
    'password' : '$2a$10$hpBGDg4mlyzVM/7g4staJuA4fuaznzY64b6/s0SwkLWrblT7vEgDK'
  },
  {
    '_id' : '5c3f5ca9ec37422f44bdaa82',
    'firstName': 'David',
    'lastName': 'Johnson',
    'username' : 'David',
    'password' : '$2a$10$vl5HbC.PsF85oL1ZikE8i.kdrUbnLGqd75FiGaHx1CB7ar0BFOAsW'
  }
];

const words = [
  {word: '¡Hola!', en: 'hello'},
  {word: 'buenos días', en: 'good morning'},
  {word: 'Buenas tardes', en: 'good afternoon'},
  {word: 'Buenas noches', en: 'goodnight'},
  {word: 'Me llamo', en: 'my name is'},
  {word: 'Gracias', en: 'thank you'},
  {word: 'De nada', en: 'you are welcome'},
];

const history = [
  {
    '_id': '222222222222222222222200',
    'userId': '333333333333333333333300',
    'word': 'hola',
    'correct': true
  },
  {
    '_id': '222222222222222222222201',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'word': 'hola',
    'correct': true
  },
  {
    '_id': '222222222222222222222202',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'word': 'hola',
    'correct': false
  },
  {
    '_id': '222222222222222222222202',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'word': 'hola',
    'correct': false
  },
  {
    '_id': '222222222222222222222202',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'word': 'hola',
    'correct': true
  },
  {
    '_id': '222222222222222222222202',
    'userId': '5c3f5ca9ec37422f44bdaa82',
    'word': 'hola',
    'correct': false
  },
];

module.exports = {
  users,
  history,
  words
};