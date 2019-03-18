import { MOVE_WORD_INDEX_RIGHT } from "../actions/dashboard";

const initialState = {
  wordsIndex : 0,
  words: ["¡Hola!", "buenos días", "Buenas tardes", "Buenas noches", "Me llamo", "Gracias", "De nada"],
};

export default function reducer(state = initialState, action) {
  if (action.type === MOVE_WORD_INDEX_RIGHT) {
      return Object.assign({}, state, {
        wordsIndex : (action.wordsIndex + 1)
      });
  }
  return state;
}
