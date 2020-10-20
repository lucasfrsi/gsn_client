import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../UI/Loading';

import PrivateRoute from './PrivateRoute';

const Home = React.lazy(() => import('../../pages/Home'));
const Profile = React.lazy(() => import('../../pages/Profile'));
const Posts = React.lazy(() => import('../../pages/Posts'));
const Post = React.lazy(() => import('../../pages/Post'));
const Moments = React.lazy(() => import('../../pages/Moments'));

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <PrivateRoute path="/my-profile" component={Profile} />
      <PrivateRoute path="/profile/:id" component={Profile} />
      <PrivateRoute path="/posts/:id" component={Post} />
      <PrivateRoute path="/posts" component={Posts} />
      <PrivateRoute path="/moments" component={Moments} />
      <Route exact path="/" component={Home} />
      <Route path="" render={() => <div>404</div>} /> {/* ADD 404 PAGE COMPONENT */}
    </Switch>
  </Suspense>
);

export default Routes;
