import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../UI/LoadingSpinner';
import defaultAvatar from '../../assets/images/default_avatar.png';

import styles from './style.scss';

const PostItem = ({
  text,
  createdAt,
  nickname,
  avatar,
}) => {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  const formatDate = () => {
    // Aug 25th at 10:13pm
    const newDate = new Date(createdAt).toLocaleDateString();
    return newDate;
  };

  return (
    <div className={styles.post}>
      <div className={styles.postUser}>
        {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
        <img
          src={avatar || defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <h4>{nickname}</h4>
      </div>

      <div className={styles.postContent}>

        <div className={styles.postData}>

          <p className={styles.postText}>
            {text}
          </p>

        </div>

        <div>
          <div className={styles.postDate}>

            <p className={styles.postCreated}>
              {/* Aug 25th at 10:13pm */}
              {formatDate()}
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

PostItem.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default PostItem;
