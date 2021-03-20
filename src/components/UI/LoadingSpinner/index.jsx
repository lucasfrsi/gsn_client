import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const LoadingSpinner = ({ size }) => (
  <div className={size}>
    <div className={styles.ldsRing}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  size: PropTypes.string.isRequired,
};

export default LoadingSpinner;
