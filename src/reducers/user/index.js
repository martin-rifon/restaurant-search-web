import actionTypes from '../../actions/user/actions';

const ACTION_HANDLERS = {
  [actionTypes.LOGGING_IN]: state => ({
    ...state,
    loggingIn: true,
  }),
  [actionTypes.LOGIN_SUCCESS]: (state, data) => ({
    ...state,
    token: data.token.session,
  }),
  [actionTypes.LOGIN_FAILURE]: state => ({
    ...state,
    loggingIn: false,
    error: true,
  }),
  [actionTypes.GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    loggingIn: false,
    error: false,
    data: action.data.user,
  }),
};

// Reducer
const initialState = {
  loggingIn: false,
  error: false,
  token: null,
  data: {},
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
