import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../UI/Loading';

import PrivateRoute from './PrivateRoute';

const Profile = React.lazy(() => import('../../pages/Profile'));
const Post = React.lazy(() => import('../../pages/Post'));
const Home = React.lazy(() => import('../../pages/Home'));

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <PrivateRoute path="/my-profile" component={Profile} />
      <PrivateRoute path="/profile/:id" component={Profile} />
      <PrivateRoute path="/posts/:id" component={Post} /> {/* can't type directly in the browser bar, it redirects */}
      <Route exact path="/" component={Home} />
      <Route path="" render={() => <div>404</div>} /> {/* ADD 404 PAGE COMPONENT */}
    </Switch>
  </Suspense>
);

export default Routes;

// TO-DO:
// Post component
// Moment component
// Profile component
// Home component
