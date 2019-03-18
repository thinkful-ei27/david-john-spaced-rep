import {
  SET_ANSWER,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SUBMIT_ANSWER_ERROR,
  MOVE_WORD_INDEX_RIGHT
} from "../actions/dashboard";

const initialState = {
  words: [
    {word: "¡Hola!", correct: 0, incorrect: 0},
    {word:"buenos días", correct: 0, incorrect: 0},
    {word:"Buenas tardes", correct: 0, incorrect: 0},
    {word:"Buenas noches", correct: 0, incorrect: 0},
    {word:"Me llamo", correct: 0, incorrect: 0},
    {word:"Gracias", correct: 0, incorrect: 0},
    {word:"De nada", correct: 0, incorrect: 0}
  ],
  wordsIndex: 0,
  answer: null,
  error: null,
  feedback: null,
  loading: null
};

export default function reducer(state = initialState, action) {
  // if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
  //   return Object.assign({}, state, {
  //     data: action.data,
  //     error: null
  //   });
  // }
  // if (action.type === FETCH_PROTECTED_DATA_ERROR) {
  //   return Object.assign({}, state, {
  //     error: action.error
  //   });
  // }
  if (action.type === MOVE_WORD_INDEX_RIGHT) {
    return Object.assign({}, state, {
      wordsIndex: action.wordsIndex + 1
    });
  }
  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {
      answer: action.answer
    });
  }
  if (action.type === SUBMIT_ANSWER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  if (action.type === SUBMIT_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      feedback: action.feedback,
      loading: false
    });
  }
  if (action.type === SUBMIT_ANSWER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
