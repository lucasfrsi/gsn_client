import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import setAuthToken from './util/setAuthToken';
import { loadUserRequest, logout } from './store/actions/auth';

import appStore from './store';

import Layout from './components/Layout';
import Routes from './components/Routes';

import './sass/base/main.scss';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      appStore.dispatch(loadUserRequest());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) appStore.dispatch(logout());
    });
  }, []);

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);

// TO-DO
// 1. Check console logs, and fix
// 2. If no bio and no genres, and only platforms, it doesn't show.
// 3. Welcome images getting stretched (height, maybe set to auto)
// 4. Character count for Title and Description in moment creation is broken
// 5. Only load images that has cover or profile, otherwise fallback to default (avoid 404s)
