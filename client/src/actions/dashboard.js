import axios from "axios";
import { API_BASE_URL } from "../config";

export const SUBMIT_ANSWER_REQUEST = "SUBMIT_ANSWER_REQUEST";
export const SUBMIT_ANSWER_SUCCESS = "SUBMIT_ANSWER_SUCCESS";
export const SUBMIT_ANSWER_ERROR = "SUBMIT_ANSWER_ERROR";

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

export const submitAnswer = () => dispatch => {
  dispatch(submitAnswerRequest());
  const authToken = getState().auth.authToken;
  const config = {
    method: "get",
    url: `${API_BASE_URL}/feedback`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    }
  };
  return axios(config)
    .then(res => {
      return dispatch(submitAnswerSuccess(feedback));
    })
    .catch(err => {
      const message = "this is an error message";
      return dispatch(submitAnswerError(message));
    });
};
