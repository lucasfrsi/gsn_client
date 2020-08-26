import React from 'react';

import styles from './style.scss';

import logo from '../../../../assets/images/logo.gif';
import bubble from '../../../../assets/images/bubble_left.png';

const Logo = () => (
  <div className={styles.logoBox}>
    <img src={logo} alt="Logo" className={styles.logo} />
    <img src={bubble} alt="Text bubble" className={styles.bubble} />
    <span>GamersX</span>
  </div>
);

export default Logo;
