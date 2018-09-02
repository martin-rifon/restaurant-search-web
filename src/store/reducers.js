import { combineReducers } from 'redux';
import userReducer from '../reducers/user';
import mapReducer from '../reducers/map';

export const makeRootReducer = asyncReducers => (
  combineReducers({
    user: userReducer,
    map: mapReducer,
    ...asyncReducers,
  })
);

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
