import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserRequest } from '../../store/actions/users';

import Loading from '../../components/UI/Loading';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import defaultAvatar from '../../assets/images/default_avatar.png';
import defaultCover from '../../assets/images/default_cover.png';

import icons from '../../assets/svg/sprite.svg';

import Overview from '../../components/Profile/Overview';
import Moments from '../../components/Profile/Moments';
import Posts from '../../components/Profile/Posts';
import ChangeAvatarOrCover from '../../components/ChangeAvatarOrCover';

import styles from './style.scss';

const Profile = ({ match }) => {
  const { user, loading, loggedUserId } = useSelector((state) => ({
    user: state.users.user,
    loading: state.users.loading,
    loggedUserId: state.auth.user._id,
  }), shallowEqual);
  const dispatch = useDispatch();

  const [avatarIsLoading, setAvatarIsLoading] = useState(true);
  const [coverIsLoading, setCoverIsLoading] = useState(true);
  const [changeAvatar, setChangeAvatar] = useState(null);

  useEffect(() => {
    const getUserProfile = (u) => dispatch(getUserRequest(u));

    if (match.url === '/my-profile') {
      getUserProfile(loggedUserId);
    } else {
      getUserProfile(match.params.id);
    }
    return function cleanUp() {
      // reset state?
      // console.log('executed profile cleanup');
    };
  }, [dispatch, loggedUserId, match.params.id, match.url]);

  const handleOnLoadAvatar = () => {
    setAvatarIsLoading(false);
  };

  const handleOnErrorAvatar = (event) => {
    setAvatarIsLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  const handleOnLoadCover = () => {
    setCoverIsLoading(false);
  };

  const handleOnErrorCover = (event) => {
    setCoverIsLoading(false);
    const img = event.target;
    img.src = defaultCover;
  };

  return (
    loading ? <Loading /> : (
      user && (
        <div className={styles.profile}>
          {changeAvatar !== null && changeAvatar === true && (
            <ChangeAvatarOrCover isAvatar={changeAvatar} closeModal={() => setChangeAvatar(null)} />
          )}
          {changeAvatar !== null && changeAvatar === false && (
            <ChangeAvatarOrCover isAvatar={changeAvatar} closeModal={() => setChangeAvatar(null)} />
          )}
          <div className={styles.cover}>
            {coverIsLoading ? <img src={defaultCover} alt="User Cover" /> : null}
            <img
              src={`http://localhost:5000/${user.profile.cover}` || defaultCover}
              alt="User Cover"
              className={styles.userPhoto}
              onLoad={handleOnLoadCover}
              onError={handleOnErrorCover}
              style={{
                display: loading ? 'none' : 'inline-block',
              }}
            />
            {user._id === loggedUserId ? (
              <button className={styles.coverButton} type="button" onClick={() => setChangeAvatar(false)}>
                <span>Change Cover</span>
                <svg className={styles.photoIcon}>
                  <use xlinkHref={`${icons}#icon-camera`} />
                </svg>
              </button>
            ) : null}
            <div className={styles.profileAvatar}>
              {avatarIsLoading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
              <img
                src={`http://localhost:5000/${user.avatar}` || defaultAvatar}
                alt="User Avatar"
                className={styles.userPhoto}
                onLoad={handleOnLoadAvatar}
                onError={handleOnErrorAvatar}
                style={{
                  display: loading ? 'none' : 'inline-block',
                }}
              />
              {user._id === loggedUserId ? (
                <button className={styles.avatarButton} type="button" onClick={() => setChangeAvatar(true)}>
                  <span>Change Avatar</span>
                  <svg className={styles.photoIcon}>
                    <use xlinkHref={`${icons}#icon-camera`} />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          <div className={styles.overview}>
            <div className={styles.meta}>
              <div className={styles.names}>
                <h1>{user.nickname}</h1>
                <h2>{user.profile.personalData && user.profile.personalData.realName ? user.profile.personalData.realName : null}</h2>
              </div>
              {user.profile.personalData && user.profile.personalData.location && (
              <div className={styles.location}>
                <svg className={styles.locationIcon}>
                  <use xlinkHref={`${icons}#icon-location-pin`} />
                </svg>
                <p className={styles.locationName}>{user.profile.personalData.location}</p>
              </div>
              )}
            </div>

            <div className={styles.kindOfPlayer}>
              <div className={styles.playerType}>{user.profile.gamerData.kind ? user.profile.gamerData.kind : 'PLAYER'}</div>
              <div className={styles.playerText}>{user.profile.gamerData.kind ? 'Player' : null}</div>
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
              {user.profile.social && Object.keys(user.profile.social).length > 0 ? (
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
        </div>
      )
    )
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape().isRequired,
  }).isRequired,
};

export default Profile;
