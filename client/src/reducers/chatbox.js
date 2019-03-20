import {
UPDATE_INPUT
} from "../actions/chatbox";

const initialState = {
  inputWord: null

};

export default function reducer(state = initialState, action) {

  if (action.type === UPDATE_INPUT) {
    return Object.assign({}, state, {
      inputWord: action.input
    });
  }

  return state;
}
