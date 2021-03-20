import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const LoadingSpinner = ({ size }) => (
  <div className={size}>
    <div className={styles.ldsRing}>
      <div style={{ border: '3px solid white', borderColor: 'white transparent transparent transparent;' }} />
      <div style={{ border: '3px solid white', borderColor: 'white transparent transparent transparent;' }} />
      <div style={{ border: '3px solid white', borderColor: 'white transparent transparent transparent;' }} />
      <div style={{ border: '3px solid white', borderColor: 'white transparent transparent transparent;' }} />
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  size: PropTypes.string.isRequired,
};
// border: ;
// border-color: $c-primary transparent transparent transparent;
export default LoadingSpinner;
