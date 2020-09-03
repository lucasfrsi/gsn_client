import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Backdrop = ({ onClick }) => {
  // LOCK BODY FROM SCROLLING, ON SAFARI TOO, SEARCH FOR IT.

  return (
    <div
      className={styles.backdrop}
      onClick={onClick}
      role="presentation"
    />
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
