import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import appStore from './store';

import Layout from './components/Layout';

import './sass/base/main.scss';

const Home = React.lazy(() => import('./pages/Home'));
const Test2 = React.lazy(() => import('./components/Post'));
const Test3 = React.lazy(() => import('./components/Moment'));

const App = () => (
  <Provider store={appStore}>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/test2" component={Test2} />
            <Route exact path="/test3" component={Test3} />
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
