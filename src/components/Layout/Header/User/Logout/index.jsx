import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../../../store/actions/auth';

import svg from '../../../../../assets/svg/sprite.svg';

import styles from './style.scss';

const Logout = ({ logoutUser, close }) => (
  <div
    role="button"
    tabIndex="0"
    className={styles.logout}
    onClick={() => {
      close();
      logoutUser();
    }}
    onKeyDown={() => {}}
  >
    <span className={styles.logoutButton}>
      Logout
      <svg className={styles.logoutIcon}>
        <use xlinkHref={`${svg}#icon-log-out`} />
      </svg>
    </span>
  </div>
);

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser: logout })(Logout);
