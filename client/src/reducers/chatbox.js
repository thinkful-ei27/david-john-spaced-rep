import { UPDATE_INPUT, UPDATE_TEXTAREA } from "../actions/chatbox";

const initialState = {
  inputWord: "",
  textArea: ""
};

export default function reducer(state = initialState, action) {

  if (action.type === UPDATE_INPUT) {
    return Object.assign({}, state, {
      inputWord: action.input
    });

  } if (action.type === UPDATE_TEXTAREA) {
    var newline = String.fromCharCode(13, 10);
    return Object.assign({}, state, {
      textArea: `${state.textArea} ${newline} ${action.outputString}`,
      inputWord : "",
    });
  }

  return state;
}
