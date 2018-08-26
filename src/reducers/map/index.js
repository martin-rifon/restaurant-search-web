import actionTypes from '../../actions/map/actions';

const ACTION_HANDLERS = {
  [actionTypes.SEARCHING_RESTAURANTS]: (state, action) =>({
    searching: true,
  }),
  [actionTypes.SEARCH_SUCCESS]: (state, action) => ({
    searching: false,
    error: false,
    results: action.results.restaurants,
  }),
  [actionTypes.SEARCH_FAILURE]: (state, action) => ({
    searching: false,
    error: true,
    results: [],
  }),
};

// Reducer
const initialState = {
  searching: false,
  error: false,
  results: [],
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
