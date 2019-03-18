import {
  
} from '';

const initialState = {
  data: ["¡Hola!", "buenos días", "Buenas tardes", "Buenas noches", "Me llamo", "Gracias", "De nada"],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
      return Object.assign({}, state, {
          data: action.data,
          error: null
      });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }
  return state;
}
