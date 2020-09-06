import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import appStore from './store';

import Layout from './components/Layout';

import './sass/base/main.scss';

const Profile = React.lazy(() => import('./pages/Profile'));
const Home = React.lazy(() => import('./pages/Home'));

// useeffect:
// check for token in local storage
// if token in LS: set token in header load user
// if no token: log out from all tabs

const App = () => (
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

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);

// TO-DO
// 1. Config babel (browser target)
