import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserRequest } from '../../store/actions/users';

import styles from './style.scss';

import avatar from '../../assets/images/avatar2.jpg';
import cover from '../../assets/images/cover2.png';

import icons from '../../assets/svg/sprite.svg';

import Overview from '../../components/Profile/Overview';
import Moments from '../../components/Profile/Moments';
import Posts from '../../components/Profile/Posts';

const Profile = ({ match, getUserProfile, loggedUserId, user, loading }) => {
  useEffect(() => {
    if (match.url === '/my-profile') {
      getUserProfile(loggedUserId);
    } else {
      getUserProfile(match.params.id);
    }
  }, [getUserProfile, loggedUserId, match.params.id, match.url]);

  return (
    loading ? <div>Loading (Gonna change later)</div> : (
      <>
        <div className={styles.cover}>
          <img src={cover} alt="cover" />
          <div className={styles.profileAvatar}>
            <img src={avatar} alt="avatar" />
          </div>
        </div>

        <div className={styles.overview}>

          <h1>{user.nickname}</h1>
          <h2>{user.profile.personalData.realName}</h2>

          <div className={styles.location}>
            <svg className={styles.locationIcon}>
              <use xlinkHref={`${icons}#icon-location-pin`} />
            </svg>
            <p className={styles.locationName}>{user.profile.personalData.location}</p>
          </div>

          <div className={styles.kindOfPlayer}>
            <div className={styles.playerType}>{user.profile.gamerData.kind}</div>
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
            {Object.keys(user.profile.social).length > 0 ? (
              <ul className={styles.socialLinks}>
                {Object.entries(user.profile.social).map(([key, value]) => (value
                  ? (
                    <li key={key}>
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        <svg className={styles[key]}>
                          <use xlinkHref={`${icons}#icon-${key}`} />
                        </svg>
                      </a>
                    </li>
                  ) : null))}
              </ul>
            ) : null}
          </div>
          <Route path={`${match.url}/`} exact component={Overview} />
          <Route path={`${match.url}/posts`} exact component={Posts} />
          <Route path={`${match.url}/moments`} exact component={Moments} />
        </div>
      </> // COMEÇAR PELO OVERVIEW
    )
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape().isRequired,
  }).isRequired,
  getUserProfile: PropTypes.func.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  user: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  loading: state.users.loading,
  loggedUserId: state.auth.user._id,
});

export default connect(mapStateToProps, { getUserProfile: getUserRequest })(Profile);
