const KEY_CODE_ESC = 27;

export const isEscEvent = (evt, action) => {
  if (evt.keyCode === KEY_CODE_ESC) {
    action();
  }
};
