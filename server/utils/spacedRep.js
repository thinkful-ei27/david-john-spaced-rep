'use strict';

const {LinkedList, display, swapNodes} = require('../linkedList/linkedList');
const ll = new LinkedList();

ll.insertLast('¡Hola!');
ll.insertLast('buenos días');
ll.insertLast('Buenas tardes');
ll.insertLast('Buenas noches');
ll.insertLast('Me llamo');
ll.insertLast('Gracias');
ll.insertLast('De nada');

const list = [
  {
    'word': '¡Hola!',
    'next': 1,
    'm': 1,
    'h': true
  },
  {
    'word': 'buenos días',
    'next': 2,
    'm': 1,
    'h': false
  },
  {
    'word': 'Buenas tardes',
    'next': 3,
    'm': 1,
    'h': false
  },
  {
    'word': 'Buenas noches',
    'next': 4,
    'm': 1,
    'h': false
  },
  {
    'word': 'Me llamo',
    'next': 5,
    'm': 1,
    'h': false
  },
  {
    'word': 'Gracias',
    'next': 6,
    'm': 1,
    'h': false
  },
  {
    'word': 'De nada',
    'next': 0,
    'm': 1,
    'h': false
  }
];

const spacedRepLL = (ll, feedback) => {
  const {word, correct} = feedback;
  const {curr} = ll.find(word);

  if (curr.next !== null) {
    curr.m = correct ? curr.m * 2 : 1;
    for (let i = 0; i < curr.m; i++) {
      swapNodes(ll, curr.next.value, curr.value);
      if (curr.next === null) {
        break;
      }
    }
  }
};

const spaceFactory = (ll) => {
  for (let i = 0; i < 200; i++) {
    const word = ll.first().value;
    const feedback = {
      word,
      correct: Math.random() < 0.75 ? true: false
    };
    console.log('feedback is ', feedback);
    spacedRepLL(ll, feedback);
  }
};

// spaceFactory(words);
// console.log(words);
console.log('before the swap');
display(ll);
// spacedRepLL(ll, {word: 'A', correct: false});
spaceFactory(ll);
console.log('after the swap');
display(ll);


// module.exports = spacedRep;