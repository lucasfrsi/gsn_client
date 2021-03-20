import React from 'react';

import char from '../../assets/images/404a.png';
import bubble from '../../assets/images/404b.png';

import styles from './style.scss';

const NotFound = () => (
  <div className={styles.notFound}>
    <div className={styles.set}>
      <img className={styles.char} src={char} alt="404 character" />
      <img className={styles.bubble} src={bubble} alt="404 bubble" />
    </div>
    <span>404</span>
    <p>Page Not Found</p>
  </div>
);

export default NotFound;
