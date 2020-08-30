import React from 'react';

import styles from './style.scss';

import icons from '../../../../assets/svg/sprite.svg';
import avatar from '../../../../assets/images/avatar2.jpg';

const User = () => (
  <nav className={styles.userNav}>

    <div className={styles.iconBox}>
      <svg className={styles.icon}>
        <use xlinkHref={`${icons}#icon-bookmark`} />
      </svg>
      {/* <span className={styles.notification}>3</span> */}
    </div>

    <div className={styles.iconBox}>
      <svg className={styles.icon}>
        <use xlinkHref={`${icons}#icon-chat`} />
      </svg>
      {/* <span className={styles.notification}>1</span> */}
    </div>

    <div>
      <img src={avatar} alt="User" className={styles.userPhoto} />
      <span>xCloudFFVII</span>
    </div>

  </nav>
);

export default User;
