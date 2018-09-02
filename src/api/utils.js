// import store from '../store';
import { store } from '../store';

export const makeRequest = (url, options = { headers: {}, method: 'GET' }) => {
  if (typeof options.body === 'string') {
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
  }

  return fetch(url, options).then(checkStatus).then(response => response.json());
};

export const makeAuthenticatedRequest = (url,  options = { headers: {}, method: 'GET' }) => {
  const state = store.getState();
  options.headers['Authorization'] = state.user.token;

  return makeRequest(url, options);
};

export const checkStatus = response => {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return response.json().then(json => {
    const error = new Error(response.statusText);
    return Promise.reject(Object.assign(error, { json }));
  });
};
