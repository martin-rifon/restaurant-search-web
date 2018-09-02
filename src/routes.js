import { Route, Redirect, Switch } from 'react-router';
import React from 'react';
import Login from './pages/login';
import Map from './pages/map';

const createRoutes = (store) => {
  return (
    <div>
      <Switch>
        <Route
          path="/(|map)/"
          render={() => {
              const { user: { token = null } } = store.getState();

              if (token) {
                return <Map />;
              }

              return <Redirect to='/login' />;
            }
          }
        />

        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
};

export default createRoutes;
