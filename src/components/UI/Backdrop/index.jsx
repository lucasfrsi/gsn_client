import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Backdrop = ({ onClick, local }) => (
  <div
    className={`${styles.backdrop} ${local ? styles.local : null}`}
    onClick={onClick}
    role="presentation"
  />
);

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
  local: PropTypes.bool.isRequired,
};

export default Backdrop;
