import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.scss';

import avatar from '../../assets/images/avatar.jpg';
import cover from '../../assets/images/cover.png';

import icons from '../../assets/svg/sprite.svg';

import Moment from '../../components/Moment';
import Post from '../../components/Post';

const Home = () => (
  <>
    <div className={styles.cover}>
      {/* <img src="https://picsum.photos/1200/400" alt="cover" /> */}
      <img src={cover} alt="cover" />

      <div className={styles.profileAvatar}>
        <img src={avatar} alt="avatar" />
      </div>

    </div>

    <div className={styles.overview}>

      <h1>Jade Curtiss</h1>
      <h2>Antônio Ferreira Junior</h2>

      <div className={styles.location}>
        <svg className={styles.locationIcon}>
          <use xlinkHref={`${icons}#icon-location-pin`} />
        </svg>
        <p className={styles.locationName}>Belo Horizonte, MG - Brazil</p>
      </div>

      <div className={styles.kindOfPlayer}>
        <div className={styles.playerType}>PRO</div>
        <div className={styles.playerText}>Player</div>
      </div>
    </div>

    <div className={styles.detail}>

      <div className={styles.header}>
        <ul className={styles.headerMenu}>
          <li className={styles.headerItem}>
            <NavLink to="/" exact className={styles.headerLink} activeClassName={styles.active}>Overview</NavLink>
          </li>
          <li className={styles.headerItem}>
            <NavLink to="/a" exact className={styles.headerLink} activeClassName={styles.active}>Posts</NavLink>
          </li>
          <li className={styles.headerItem}>
            <NavLink to="/b" exact className={styles.headerLink} activeClassName={styles.active}>Moments</NavLink>
          </li>
        </ul>

        <ul className={styles.socialLinks}>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg className={styles.socialIconFacebook}>
                <use xlinkHref={`${icons}#icon-facebook`} />
              </svg>
            </a>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg className={styles.socialIconTwitter}>
                <use xlinkHref={`${icons}#icon-twitter`} />
              </svg>
            </a>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg className={styles.socialIconInstagram}>
                <use xlinkHref={`${icons}#icon-instagram`} />
              </svg>
            </a>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg className={styles.socialIconYoutube}>
                <use xlinkHref={`${icons}#icon-youtube`} />
              </svg>
            </a>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg className={styles.socialIconTwitch}>
                <use xlinkHref={`${icons}#icon-twitch`} />
              </svg>
            </a>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg className={styles.socialIconPatreon}>
                <use xlinkHref={`${icons}#icon-patreon`} />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.container}>
        <p>nothing yet</p>
      </div>
    </div>

    <div className={styles.cta}>
      <h2 className={styles.ctaBookNow}>
        TWITCH.TV - LIVE CHANNEL
      </h2>

      <iframe
        title="twitch"
        // src={`https://player.twitch.tv/?channel=disguisedtoast&parent=${window.location.hostname}&muted=true`}
        height="300"
        width="400"
        frameBorder="1"
        scrolling="no"
        allowFullScreen={false}
      />
    </div>

  </>
);

export default Home;
