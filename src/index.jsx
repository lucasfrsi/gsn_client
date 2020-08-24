import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import appStore from './store';

import Layout from './components/Layout';

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

// Document Bootstrap
const app = document.createElement('div');
document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.appendChild(app);

ReactDOM.render(<App />, app);
