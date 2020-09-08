import React, { useState } from 'react';
import Auth from '../Auth';

import svg from '../../assets/svg/sprite.svg';
import styles from './style.scss';

const Landing = () => {
  const [auth, setAuth] = useState({
    auth: false,
    isLogin: null,
  });

  const openAuthModal = (modalMode) => {
    setAuth({
      auth: true,
      isLogin: modalMode,
    });
  };

  const closeAuthModal = () => {
    setAuth({
      auth: false,
      isLogin: null,
    });
  };

  return (
    <div className={styles.landing}>
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
              <span role="button" tabIndex="0" onKeyDown={() => {}} className={styles.connectButtonsSignup} onClick={() => openAuthModal(false)}>Sign Up</span>
              <span role="button" tabIndex="0" onKeyDown={() => {}} className={styles.connectButtonsLogin} onClick={() => openAuthModal(true)}>Log In</span>
            </div>
          </div>
        </div>
      </div>
      {auth.auth ? <Auth isAuthLogin={auth.isLogin} close={closeAuthModal} /> : null}
    </div>
  );
};

export default Landing;
