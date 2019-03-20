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
  console.log('tested word is ', word);
  // const checkWord = arr.find(arrWord => arrWord.word === word);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].word === word) {
      let m = arr[i].m;
      let next = arr[i].next;
      arr[i].m =  correct ? (arr[i].m * 2) : 1
      arr.forEach(wordOfArr => {
        if (wordOfArr.next === i) {
          arr[i].next = wordOfArr.next
        }
      })
      arr[i + arr[i].m].next = i;
      //change next based on % ret val
      //may have duplicate, find duplicate, change to not be duplicate
      //
      arr[i].h = false;
      arr[i + arr[i].m].h = true;
      break;
  }
  return arr;
};
}
const spaceFactory = (arr) => {
  for (let i = 0; i < 350; i++) {
    const head = arr.find(word => word.h === true);
    // console.log('head is ', head);
    const feedback = {
      word: head.word,
      correct: Math.random() < 0.5 ? true: false
    };
    spacedRep(arr, feedback);
  }
};

console.log(spaceFactory(words))
console.log(words)
module.exports = spacedRep