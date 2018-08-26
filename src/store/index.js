import { applyMiddleware, createStore, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import persistState from 'redux-localstorage';

export const history = createBrowserHistory();

const middleware = [routerMiddleware(history), thunk];

const enhancer = compose(
  applyMiddleware(...middleware),
  persistState('user'),
);

// Store Instantiation
export const store = createStore(
  connectRouter(history)(makeRootReducer()),
  {},
  enhancer
);

// export default store;
