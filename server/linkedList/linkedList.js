'use strict';

class _Node {
  constructor(value, m, next) {
    this.value=value;
    this.m=m;
    this.next=next;
  }
}

class LinkedList {
  constructor() {
    this.head=null;
  }

  first() {
    return this.head;
  }

  find(item) {
    let prev = null;
    let curr = this.head;
    while (curr !== null && curr.value !== item) {
      prev = curr;
      curr = curr.next;
    }
    return {prev, curr};
  }

  insertFirst(item) {
    this.head = new _Node(item, 1, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, 1, null);
    }
  }
}

const display = (sll) => {
  console.log(JSON.stringify(sll, null, 2));
};

// x swap will be the later item in the list
const swapNodes = (sll, x, y) => {
  if (x === y) return;

  // Search for x
  let xNode = sll.find(x);

  // Search for y
  let yNode = sll.find(y);

  // If x or y is not present, nothing to do
  if (xNode === null || yNode === null) return;
  // If x is not head of linked list
  if (xNode.prev !== null) {
    xNode.prev.next = yNode.curr;
  } else {
    sll.head = yNode.curr;
  }

  // if y is not head of linked list
  if (yNode.prev !== null) {
    yNode.prev.next = xNode.curr;
  } else {
    sll.head = xNode.curr;
  }

  // Swap next pointers - make sure not null
  let temp = xNode.curr.next;
  xNode.curr.next = yNode.curr.next;
  yNode.curr.next = temp;

};

function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}
const alphabet = genCharArray('a', 'z'); // ["a", ..., "z"]

// const list = new LinkedList();
// alphabet.forEach(letter => list.insertLast(letter));
// swapFactory(list, 'b', 22);
// // swapNodes(list, 'b', 'c');
// display(list);

module.exports = {
  LinkedList,
  display,
  swapNodes
};