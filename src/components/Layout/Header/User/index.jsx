import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../../../UI/LoadingSpinner';

import styles from './style.scss';

import defaultAvatar from '../../../../assets/images/default_avatar.png';

const User = ({ auth }) => {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  return (auth.isAuthenticated && auth.user !== null && (
    <nav className={styles.userNav}>

      <div>
        {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
        <img
          src={auth.user.avatar || defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <span>{auth.user.nickname}</span>
      </div>

    </nav>
  ));
};

User.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(User);

// import icons from '../../../../assets/svg/sprite.svg';
/* <div className={styles.iconBox}>
  <svg className={styles.icon}>
    <use xlinkHref={`${icons}#icon-bookmark`} />
  </svg>
  <span className={styles.notification}>3</span>
</div> */

/* <div className={styles.iconBox}>
  <svg className={styles.icon}>
    <use xlinkHref={`${icons}#icon-chat`} />
  </svg>
  <span className={styles.notification}>1</span>
</div> */
