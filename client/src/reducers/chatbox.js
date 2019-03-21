import {
UPDATE_INPUT,
UPDATE_TEXTAREA,
UPDATE_QUESTION,
} from "../actions/chatbox";

const initialState = {
  inputWord: "",
  textArea: [],
  answer:""
};

export default function reducer(state = initialState, action) {

  if (action.type === UPDATE_INPUT) {
    return Object.assign({}, state, {
      inputWord: action.input
    });

  } else  if (action.type === UPDATE_TEXTAREA) {
    return Object.assign({}, state, {
      textArea: [...textArea, action.updateObject],
      inputWord : "",
    });

  } else  if (action.type === UPDATE_QUESTION) {
    return Object.assign({}, state, {
      textArea: [...textArea, action.updateObject],
      answer: action.updateObject.answer
    });
  }

  return state;
}
