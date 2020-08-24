import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import appStore from './store';

import Layout from './components/Layout';

import './sass/main.scss';

// const Home = React.lazy(() => import('./pages/Home'));
// Route component={Home}

const App = () => (
  <Provider store={appStore}>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => <div>Test</div>} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </Provider>
);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);
