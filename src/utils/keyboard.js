const KEY_CODE_ESC = 27;

/**
 * Execute callback if press ESC
 * @param {Object} evt event
 * @param {*} action callback
 */
export const isEscEvent = (evt, action) => {
  if (evt.keyCode === KEY_CODE_ESC) {
    action();
  }
};
