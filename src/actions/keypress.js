export const KEYPRESS = 'KEYPRESS';

// keypress :: KeyboardEvent -> Action
const keypress = ({ key, charCode }) => ({
  type: KEYPRESS,
  payload: { key, charCode }
});

export default keypress;
