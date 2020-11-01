import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../../../UI/LoadingSpinner';
import defaultAvatar from '../../../../../assets/images/default_avatar.png';

import styles from './style.scss';

const ResultItem = ({ id, avatar, nickname, realName, onFocus, onClick, queryString, onKeyDown }) => {
  const [loading, setLoading] = useState(true);

  const highlightQuery = (source, query) => {
    const defaultHighlight = (s) => <span className={styles.bold}>{s}</span>;
    const escapeRegex = (v) => v.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');

    const res = [];
    if (!source) return res;
    if (!query) return source;

    const regex = new RegExp(escapeRegex(query), 'gi');
    let lastOffset = 0;

    source.replace(regex, (val, offset) => {
      res.push(
        source.substr(lastOffset, offset - lastOffset),
        (defaultHighlight)(val),
      );
      lastOffset = offset + val.length;
    });

    res.push(source.substr(lastOffset));
    return res;
  };

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
      <Link to={`/profile/${id}`} className={styles.resultLink} onFocus={onFocus} onClick={onClick} onKeyDown={onKeyDown}>
        {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
        <img
          src={`http://localhost:5000/${avatar}` || defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <span className={styles.nickname}>{highlightQuery(nickname, queryString)}</span>
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
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  queryString: PropTypes.string,
};

ResultItem.defaultProps = {
  avatar: '',
  realName: '',
  queryString: '',
};

export default ResultItem;
