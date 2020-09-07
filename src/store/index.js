import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import setAuthToken from '../util/setAuthToken';

import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

let currentState = appStore.getState();

appStore.subscribe(() => {
  const previousState = currentState;
  currentState = appStore.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const { token } = currentState.auth;
    setAuthToken(token);
  }
});

export default appStore;
