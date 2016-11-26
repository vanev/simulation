import { compose } from 'lodash/fp';
import { createStore } from 'redux';

import initialState from './initialState';

import reducer from './reducers/index';

import render from './renderers';

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const canvasEl = document.getElementById('map');
const context = canvasEl.getContext('2d');

store.subscribe(() => {
  const state = store.getState();
  render(context)(state);
});

render(context)(initialState);
