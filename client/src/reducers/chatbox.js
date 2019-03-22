import {
  UPDATE_INPUT,
  UPDATE_TEXTAREA,
  UPDATE_QUESTION
} from "../actions/chatbox";

const initialState = {
  inputWord: "",
  textArea: [],
};

export default function reducer(state = initialState, action) {
  if (action.type === UPDATE_INPUT) {
    return Object.assign({}, state, {
      inputWord: action.input
    });
  }
  if (action.type === UPDATE_TEXTAREA) {
    console.log(action.updateObject);
    return Object.assign({}, state, {
      textArea: [...state.textArea, action.updateObject],
    });
  }
  if (action.type === UPDATE_QUESTION) {
    return Object.assign({}, state, {
      textArea: [...state.textArea, action.updateObject],
      inputWord: ""
    });
  }

  return state;
}
