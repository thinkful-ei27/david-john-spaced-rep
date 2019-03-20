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

// display(ll);

const list = {
  'head': {
    'value': '¡Hola!',
    'm': 1,
    'next': {
      'value': 'buenos días',
      'm': 1,
      'next': {
        'value': 'Buenas tardes',
        'm': 1,
        'next': {
          'value': 'Buenas noches',
          'm': 1,
          'next': {
            'value': 'Me llamo',
            'm': 1,
            'next': {
              'value': 'Gracias',
              'm': 1,
              'next': {
                'value': 'De nada',
                'm': 1,
                'next': null
              }
            }
          }
        }
      }
    }
  }
};

const objList = new LinkedList();

const listFromObj = (obj, sll) => {
  let {head} = obj;
  let next = head.next;
  let value = head.value;
  let m = head.m;

  while (next !== null) {
    sll.insertLast(value, m);
    value = next.value;
    m = next.m;
    next = next.next;
  }
  sll.insertLast(value, m);

};

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

const spaceFactory = (listObj) => {
  for (let i = 0; i < 50; i++) {
    const ll = new LinkedList();
    listFromObj(listObj, ll);
    listObj = JSON.stringify(ll, null, 2);
    const word = ll.first().value;
    const feedback = {
      word,
      correct: Math.random() < 0.50 ? true: false
    };
    spacedRepLL(ll, feedback);
    listObj = ll;
  }
};

// spaceFactory(words);
// console.log(words);
// console.log('before the swap');
// display(ll);
// spacedRepLL(ll, {word: 'A', correct: false});
// spaceFactory(ll);
// console.log('after the swap');
// display(ll);
// spaceFactory(list);
// console.log(JSON.stringify(list, null, 2));


module.exports = {
  spacedRepLL,
  listFromObj,
};