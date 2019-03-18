import axios from "axios";
import { API_BASE_URL } from "../config";

export const SET_ANSWER = "SET_ANSWER";
export const SUBMIT_ANSWER_REQUEST = "SUBMIT_ANSWER_REQUEST";
export const SUBMIT_ANSWER_SUCCESS = "SUBMIT_ANSWER_SUCCESS";
export const SUBMIT_ANSWER_ERROR = "SUBMIT_ANSWER_ERROR";

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

export const submitAnswer = val => dispatch => {
  dispatch(submitAnswerRequest());
  const config = {
    method: "post",
    url: `${API_BASE_URL}/dashboard/feedback`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.authToken}`
    },
    data: {
      word: "hola",
      answer: val
    }
  };
  return axios(config)
    .then(response => {
      const { data } = response;
      console.log(data.response);
      return dispatch(submitAnswerSuccess(data.response));
    })
    .catch(err => {
      const message = "this is an error message";
      return dispatch(submitAnswerError(message));
    });
};
