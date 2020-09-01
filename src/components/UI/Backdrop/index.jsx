import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Backdrop = ({ onClick }) => (
  <div
    className={styles.backdrop}
    onClick={onClick}
    role="presentation"
  />
);

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
