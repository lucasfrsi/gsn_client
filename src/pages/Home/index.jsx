import React from 'react';

import svg from '../../assets/svg/sprite.svg';
import styles from './style.scss';

const Home = () => (
  <div className={styles.home}>
    <div className={styles.container}>
      <div className={styles.ctaContainer}>
        <div className={styles.cta}>
          <div className={styles.ctaItem}>
            <svg className={styles.ctaItemIcon}>
              <use xlinkHref={`${svg}#icon-slideshare`} />
            </svg>
            <p>Follow other gamers.</p>
          </div>
          <div className={styles.ctaItem}>
            <svg className={styles.ctaItemIcon}>
              <use xlinkHref={`${svg}#icon-share`} />
            </svg>
            <p>Share your favorite moments.</p>
          </div>
          <div className={styles.ctaItem}>
            <svg className={styles.ctaItemIcon}>
              <use xlinkHref={`${svg}#icon-network`} />
            </svg>
            <p>One platform, all you need. </p>
          </div>
        </div>
      </div>
      <div className={styles.connectContainer}>
        <div className={styles.connect}>
          <div className={styles.connectHeading}>
            <h1>See what’s happening in the gaming world right now</h1>
          </div>
          <div className={styles.connectItem}>
            <p>Join GamersX today.</p>
          </div>
          <div className={styles.connectButtons}>
            <span className={styles.connectButtonsSignup}>Sign Up</span>
            <span className={styles.connectButtonsLogin}>Log In</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
