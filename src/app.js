import { compose } from 'lodash/fp';
import { createStore } from 'redux';

import initialState from './initialState';

import reducer from './reducers/index';

import render from './renderers';

import tick from './actions/tick';

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
  if (state.ticking) requestAnimationFrame(() => store.dispatch(tick()));
});

const nextTickButton = document.querySelector('[data-next-tick]');
nextTickButton.addEventListener('click', () => store.dispatch(tick()));

store.dispatch(tick());
