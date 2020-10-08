import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileImage from '../UI/ProfileImage';

import grr from '../../assets/images/reactions/grr.png';
import haha from '../../assets/images/reactions/haha.png';
import like from '../../assets/images/reactions/like.png';
import love from '../../assets/images/reactions/love.png';
import nani from '../../assets/images/reactions/nani.png';
import sob from '../../assets/images/reactions/sob.png';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const Moment = ({
  user,
  title,
  text,
  imageUrl,
  reactions,
  createdAt,
  nickname,
  avatar,
}) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <div className={styles.moment}>
      <div className={styles.momentHeading}>
        <p className={styles.momentTitle}>{title}</p>
        <svg className={styles.momentPhotoButton}>
          <use xlinkHref={`${svg}#icon-image`} />
        </svg>
      </div>
      <div className={styles.momentText}>{text}</div>
      <div className={styles.reactToMoment}>
        <img src={like} alt="Like" />
      </div>
      <div className={styles.momentData}>
        <div className={styles.momentReactionsBox}>
          <div className={styles.momentReactions}>
            <img src={nani} alt="Nani" className={styles.reactionImg} />
            <img src={love} alt="Love" className={styles.reactionImg} />
            <img src={haha} alt="Haha" className={styles.reactionImg} />
          </div>
          <div className={styles.reactionCount}><span>67</span> Reactions</div>
        </div>
        <div className={styles.momentUserBox}>
          <p className={styles.momentUserName}>{nickname}</p>
          <p className={styles.momentUserDate}>Aug 26<sup>th</sup>, 2020</p>
        </div>
        <ProfileImage profileImage={avatar} customStyle={styles.momentUserPhoto} />
      </div>
    </div>
  );
};

Moment.propTypes = {
  user: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  reactions: PropTypes.arrayOf().isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Moment;
