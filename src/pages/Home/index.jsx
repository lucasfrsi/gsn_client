import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Welcome from '../../components/Welcome';
import Landing from '../../components/Landing';

const Home = ({ isAuthenticated }) => (
  isAuthenticated ? <Welcome /> : <Landing />
);

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
