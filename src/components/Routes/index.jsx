import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const Profile = React.lazy(() => import('../../pages/Profile'));
const Home = React.lazy(() => import('../../pages/Home'));

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}> {/* ADD LOADING SPINNER */}
    <Switch>
      <PrivateRoute path="/my-profile" component={Profile} />
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
