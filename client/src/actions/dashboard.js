export const MOVE_WORD_INDEX_RIGHT = 'MOVE_WORD_INDEX_RIGHT';
export const moveWordIndexRight = (wordsIndex) => {
  return ({
  type: MOVE_WORD_INDEX_RIGHT,
  wordsIndex: (wordsIndex)
  })
};
