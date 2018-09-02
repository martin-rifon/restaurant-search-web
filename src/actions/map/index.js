import actions from './actions';
import api from '../../api/index';

export const searchRestaurants = (lng, lat) => (dispatch, getState) => {
  dispatch({ type: actions.SEARCHING_RESTAURANTS });

  const { user: { data: { id, country: { id: countryId } } } } = getState();

  api.searchRestaurants(lng, lat, countryId, id)
    .then(results => {
      dispatch({ type: actions.SEARCH_SUCCESS, results });
    })
    .catch(error => dispatch({ type: actions.SEARCH_FAILURE, error }));
};
