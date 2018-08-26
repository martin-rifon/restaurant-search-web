import { push } from 'connected-react-router';

import actions from './actions';
import api from '../../api/index';

export const login = (email, password) => (dispatch, getState) => {
  dispatch({ type: actions.LOGGING_IN });

  api.login(email, password)
    .then(token => {
      dispatch({ type: actions.LOGIN_SUCCESS, token });
      api.getUserData()
        .then(data => {
          dispatch({ type: actions.GET_USER_SUCCESS, data });
          dispatch(push('/map'));
        })
        .catch(error => dispatch({ type: actions.GET_USER_FAILURE, error }));
    })
    .catch(error => dispatch({ type: actions.LOGIN_FAILURE, error }));
};
