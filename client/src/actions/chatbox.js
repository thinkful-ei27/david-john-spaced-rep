export const UPDATE_INPUT = "UPDATE_INPUT";
export const UPDATE_TEXTAREA = "UPDATE_TEXTAREA";
export const UPDATE_QUESTION = "UPDATE_QUESTION";

export const updateInput = input => {
  return {
    type: UPDATE_INPUT,
    input
  };
};

export const updateTextArea = updateObject => {
  return {
    type: UPDATE_TEXTAREA,
    updateObject
  };
};

export const updateQuestion = updateObject => {
  return {
    type: UPDATE_QUESTION,
    updateObject
  };
};
