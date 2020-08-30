import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './style.scss';

import avatar from '../../assets/images/avatar2.jpg';
import cover from '../../assets/images/cover2.png';

import icons from '../../assets/svg/sprite.svg';

import Overview from '../../components/Profile/Overview';
import Moments from '../../components/Profile/Moments';
import Posts from '../../components/Profile/Posts';

import Moment from '../../components/Moment';
import Post from '../../components/Post';

const Profile = ({ match }) => (
  <>
    <div className={styles.cover}>
      <img src={cover} alt="cover" />
      <div className={styles.profileAvatar}>
        <img src={avatar} alt="avatar" />
      </div>
    </div>

    <div className={styles.overview}>

      <h1>xCloudFFVII</h1>
      <h2>Gabriel Mendonça Soares</h2>

      <div className={styles.location}>
        <svg className={styles.locationIcon}>
          <use xlinkHref={`${icons}#icon-location-pin`} />
        </svg>
        <p className={styles.locationName}>Florianópolis, SC - Brazil</p>
      </div>

      <div className={styles.kindOfPlayer}>
        <div className={styles.playerType}>CASUAL</div>
        <div className={styles.playerText}>Player</div>
      </div>
    </div>

    <div className={styles.detail}>

      <div className={styles.header}>
        <ul className={styles.headerMenu}>
          <li className={styles.headerItem}>
            <NavLink to={`${match.url}`} exact className={styles.headerLink} activeClassName={styles.active}>Overview</NavLink>
          </li>
          <li className={styles.headerItem}>
            <NavLink to={`${match.url}/posts`} exact className={styles.headerLink} activeClassName={styles.active}>Posts</NavLink>
          </li>
          <li className={styles.headerItem}>
            <NavLink to={`${match.url}/moments`} exact className={styles.headerLink} activeClassName={styles.active}>Moments</NavLink>
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
      <Route path={`${match.url}/`} exact component={Overview} />
      <Route path={`${match.url}/posts`} exact component={Posts} />
      <Route path={`${match.url}/moments`} exact component={Moments} />
    </div>
  </>
);

Profile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
