import {
  SET_ANSWER,
  SUBMIT_ANSWER_REQUEST,
  SUBMIT_ANSWER_SUCCESS,
  SUBMIT_ANSWER_ERROR,
  UPDATE_WORD_START,
  UPDATE_WORD_SUCCESS,
  NEW_WORD_ERROR,
} from "../actions/dashboard";

const initialState = {
  word : null,
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

  if (action.type === UPDATE_WORD_START) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  if (action.type === UPDATE_WORD_SUCCESS) {
    return Object.assign({}, state, {
      word: action.word,
      loading: false
    });
  }
  if (action.type === NEW_WORD_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
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
