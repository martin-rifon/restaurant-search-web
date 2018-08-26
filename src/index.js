import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './store';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      {createRoutes(store)}
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object,
};

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
