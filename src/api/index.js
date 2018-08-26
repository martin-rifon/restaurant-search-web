import { makeRequest, makeAuthenticatedRequest } from './utils';

const API_URL = 'http://localhost:3000';

export const login = (email, password) => (
  makeRequest(`${API_URL}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user: email, pass: password }),
    }
  )
);

export const getUserData = () => (
  makeAuthenticatedRequest(`${API_URL}/users`)
);

export const searchRestaurants = (lng, lat, country, user) => {
  const params = `lng=${lng}&lat=${lat}&country=${country}&user=${user}`;
  return makeAuthenticatedRequest(`${API_URL}/restaurants?${params}`);
};

export default {
  login,
  getUserData,
  searchRestaurants,
};
