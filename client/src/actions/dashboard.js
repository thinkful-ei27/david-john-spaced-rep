import axios from "axios";
import { API_BASE_URL } from "../config";

export const UPDATE_WORD_SUCCESS = "UPDATE_WORD_SUCCESS";
export const UPDATE_WORD_START = "UPDATE_WORD_START";
export const NEW_WORD_ERROR = "NEW_WORD_ERROR"
export const SET_ANSWER = "SET_ANSWER";
export const SUBMIT_ANSWER_REQUEST = "SUBMIT_ANSWER_REQUEST";
export const SUBMIT_ANSWER_SUCCESS = "SUBMIT_ANSWER_SUCCESS";
export const SUBMIT_ANSWER_ERROR = "SUBMIT_ANSWER_ERROR";

export const updateWordSuccess = word => {
  return {
    type: UPDATE_WORD_SUCCESS,
    word
  };
};

export const updateWordStart = word => {
  return {
    type: UPDATE_WORD_START,
    word
  };
};

export const setAnswer = answer => ({
  type: SET_ANSWER,
  answer
});

export const submitAnswerRequest = () => ({
  type: SUBMIT_ANSWER_REQUEST
});

export const submitAnswerSuccess = feedback => ({
  type: SUBMIT_ANSWER_SUCCESS,
  feedback
});

export const submitAnswerError = error => ({
  type: SUBMIT_ANSWER_ERROR,
  error
});

export const newWordError = error => ({
  type: NEW_WORD_ERROR,
  error
})

export const getNewWord = () => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  dispatch(updateWordStart())
  const config = {
    method: 'GET',
    url: `${API_BASE_URL}/words`, 
  }
  return axios(config)
      .then(({data}) => {
        console.log(data.word.word)
         dispatch(updateWordSuccess(data.word.word))
      })
      .catch(err => {
          dispatch(newWordError(err));
      });
};


export const submitAnswer = (val, word) => dispatch => {
  dispatch(submitAnswerRequest());
  const config = {
    method: "post",
    url: `${API_BASE_URL}/dashboard/feedback`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.authToken}`
    },
    data: {
      word,
      answer: val
    }
  };
  return axios(config)
    .then(response => {
      const { data } = response;
      console.log(data.response);
      return dispatch(submitAnswerSuccess(data.response));
    })
    .then( () => {
      return getNewWord()
    })
    .catch(err => {
      const message = "this is an error message";
      return dispatch(submitAnswerError(message));
    });
};
