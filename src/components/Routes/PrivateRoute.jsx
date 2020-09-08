import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  isAuthenticated,
  exact,
  path,
  component: Component,
}) => (
  <Route
    exact={exact}
    path={path}
    // eslint-disable-next-line react/jsx-props-no-spreading
    render={(props) => (isAuthenticated ? (<Component {...props} />) : (<Redirect to="/" />))}
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
