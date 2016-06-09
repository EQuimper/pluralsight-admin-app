import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [
  reduxImmutableStateInvariant(),
  createLogger(),
  thunk
];

const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    enhancers
  );
};

export default configureStore;
