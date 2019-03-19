'use strict';

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

const words = [
  {word: 'A', next: 1, m: 1, h: true}, // Head
  {word: 'B', next: 2, m: 1, h: false},
  {word: 'C', next: 3, m: 1, h: false},
  {word: 'D', next: 4, m: 1, h: false},
  {word: 'E', next: 0, m: 1, h: false},
];

// // Answered A correctly
// const words = [
//   {word: 'A', next: 3, m: 2, h: false}, // next +2
//   {word: 'B', next: 2, m: 1, h: true}, // Head
//   {word: 'C', next: 0, m: 1, h: false}, // next -2
//   {word: 'D', next: 4, m: 1, h: false},
//   {word: 'E', next: 1, m: 1, h: false}, // next + 1
// ];

const feedback = [
  {word: 'A', correct: true},
  {word: 'B', correct: false},
  {word: 'C', correct: false},
  {word: 'D', correct: true},
  // {word: 'E', correct: true},
];

const spacedRep = (arr, feedback) => {
  // Feedback contains correct or incorrect
  // If correct, double the M value
  // If incorrect, reset M to 1
  // reset head to next
  // Move next by M; If m runs out of space, swap next with highest?
  // const next = (next + m) % arr.length;
  const {word, correct} = feedback;
  // const checkWord = arr.find(arrWord => arrWord.word === word);
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (arr[i].word === word && correct) {
      let m = arr[i].m;
      let next = arr[i].next;
      arr[i].m = m * 2;
      arr[i].next = (next + arr[i].m) % arr.length;
      arr[i].h = false;
      arr[next].h = true;
      break;
    } else if (arr[i].word === word && !correct) {
      let m = arr[i].m;
      let next = arr[i].next;
      arr[i].m = 1;
      arr[i].next = (next + m) % arr.length;
      arr[i].h = false;
      arr[next].h = true;
      break;
    }
  }
  return arr;
};

const spaceFactory = (arr) => {
  const head = arr.find(word => word.h === true);
  console.log('head is ', head);
  const feedback = {
    word: head.word,
    correct: Math.random() < 0.5 ? true: false
  };
  for (let i = 0; i < 2; i++) {
    spacedRep(arr, feedback);
  }
};

spaceFactory(words);
console.log(words);