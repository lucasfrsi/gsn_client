import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import setAuthToken from './util/setAuthToken';
import { loadUserRequest, logout } from './store/actions/auth';

import appStore from './store';

import Layout from './components/Layout';

import './sass/base/main.scss';

const Profile = React.lazy(() => import('./pages/Profile'));
const Home = React.lazy(() => import('./pages/Home'));

const App = () => {
  useEffect(() => {
    // If there's a token in local storage, set it in the API header and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      appStore.dispatch(loadUserRequest());
    }

    // If there's no token in local store, logout in all tabs
    window.addEventListener('storage', () => {
      if (!localStorage.token) appStore.dispatch(logout());
    });
  }, []);

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/my-profile" component={Profile} />
              <Route path="/" exact component={Home} />
              <Route path="" render={() => <div>Not implemented</div>} />
            </Switch>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);

// TO-DO
// 1. Config babel (browser target)
