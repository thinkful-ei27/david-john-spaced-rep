'use strict';

const words = [
  {word: 'A', next: 'B', m: 1, h: true}, // Head
  {word: 'B', next: 'C', m: 1, h: false},
  {word: 'C', next: 'D', m: 1, h: false},
  {word: 'D', next: 'E', m: 1, h: false},
  {word: 'E', next: 'A', m: 1, h: false},
];

// First word: A
// A is correctly answered
const words = [
  {word: 'A', next: 'D', m: 2, h: false},
  {word: 'B', next: 'C', m: 1, h: true}, // Head
  {word: 'C', next: 'A', m: 1, h: false},
  {word: 'D', next: 'E', m: 1, h: false},
  {word: 'E', next: 'A', m: 1, h: false},
];

// Second word: B
// B is incorrectly answered
const words = [
  {word: 'A', next: 'D', m: 2, h: false},
  {word: 'B', next: 'A', m: 1, h: false}, 
  {word: 'C', next: 'B', m: 1, h: true}, // Head
  {word: 'D', next: 'E', m: 1, h: false},
  {word: 'E', next: 'A', m: 1, h: false},
];

// Third word: C
// C is incorrectly answered
const words = [
  {word: 'A', next: 'C', m: 2, h: false},
  {word: 'B', next: 'A', m: 1, h: true}, // Head
  {word: 'C', next: 'D', m: 1, h: false}, 
  {word: 'D', next: 'E', m: 1, h: false},
  {word: 'E', next: 'A', m: 1, h: false},
];

// Get head value
// Ask question (front end)
// If correct: Double the value of M
// If incorrect: Reset M to 1
// Move the question back M places in the list