import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './style.scss';

import logo from '../../../../assets/images/logo.gif';
import bubble from '../../../../assets/images/bubble_left.png';

const Logo = ({ isAuthenticated }) => (
  <div className={styles.logoBox}>
    <img src={logo} alt="Logo" className={styles.logo} />
    {!isAuthenticated && <img src={bubble} alt="Text bubble" className={styles.bubble} />}
    <span>GamersX</span>
  </div>
);

Logo.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Logo);
