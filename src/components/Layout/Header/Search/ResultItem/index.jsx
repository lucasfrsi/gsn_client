import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../../../UI/LoadingSpinner';
import defaultAvatar from '../../../../../assets/images/default_avatar.png';

import styles from './style.scss';

const ResultItem = ({ id, avatar, nickname, realName, onBlur, onFocus, onClick }) => {
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
    <li className={styles.resultItem}>
      <Link to={`/profile/${id}`} className={styles.resultLink} onFocus={onFocus} onBlur={onBlur} onClick={onClick}>
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
        <span className={styles.nickname}>{nickname}</span>
        <span className={styles.realName}>{realName}</span>
      </Link>

    </li>
  );
};

ResultItem.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  realName: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

ResultItem.defaultProps = {
  avatar: '',
  realName: '',
};

export default ResultItem;
