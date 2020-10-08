import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../LoadingSpinner';
import defaultAvatar from '../../../assets/images/default_avatar.png';

import styles from './style.scss';

const ProfileImage = ({ profileImage, customStyle }) => {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  return (
    <>
      {loading ? <LoadingSpinner size={customStyle} /> : null}
      <img
        src={profileImage || defaultAvatar}
        alt="User Avatar"
        className={`${styles.profileImage} ${customStyle}`}
        onLoad={handleOnLoad}
        onError={handleOnError}
        style={{
          display: loading ? 'none' : 'inline-block',
        }}
      />
    </>
  );
};

ProfileImage.propTypes = {
  profileImage: PropTypes.string.isRequired,
  customStyle: PropTypes.string.isRequired,
};

export default ProfileImage;
