import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteMomentRequest, reactMomentRequest } from '../../store/actions/moments';

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
  momentId,
  userId,
  title,
  text,
  imageUrl,
  reactions,
  createdAt,
  nickname,
  avatar,
}) => {
  const [showImage, setShowImage] = useState(false);

  const formatDate = () => {
    const date = new Date(createdAt).toDateString();
    const splitDate = date.split(' ');
    const [, month, day, year] = splitDate;
    let ordinalSuperscript;

    if (day.length === 1) {
      switch (day) {
        case '1':
          ordinalSuperscript = 'st';
          break;
        case '2':
          ordinalSuperscript = 'nd';
          break;
        case '3':
          ordinalSuperscript = 'rd';
          break;
        default:
          ordinalSuperscript = 'th';
          break;
      }
    } else if (day.length === 2) {
      switch (day[1]) {
        case '1':
          ordinalSuperscript = 'st';
          break;
        case '2':
          ordinalSuperscript = 'nd';
          break;
        case '3':
          ordinalSuperscript = 'rd';
          break;
        default:
          ordinalSuperscript = 'th';
          break;
      }
    }

    return <p className={styles.momentUserDate}>{`${month} ${day}`}<sup>{ordinalSuperscript}</sup>, {year}</p>;
  };

  const renderReactions = () => {
    const reactionsObject = {
      grr: 0,
      haha: 0,
      like: 0,
      love: 0,
      nani: 0,
      sob: 0,
    };

    const reactionsCount = reactions.reduce((counter, { user, type }) => {
      reactionsObject[type] += 1;
      counter += 1;
      return counter;
    }, 0);

    const sortedReactions = Object.entries(reactionsObject);
    console.log(sortedReactions);

    let reactionsNoun = ' Reactions';
    if (reactionsCount === 1) reactionsNoun = ' Reaction';

    return (
      <div className={styles.momentReactionsBox}>
        <div className={styles.momentReactions}>
          <img src={nani} alt="Nani" className={styles.reactionImg} />
          <img src={love} alt="Love" className={styles.reactionImg} />
          <img src={haha} alt="Haha" className={styles.reactionImg} />
        </div>
        <div className={styles.reactionCount}><span>{reactionsCount === 0 ? 'No' : reactionsCount}</span>{reactionsNoun}</div>
      </div>
    );
  };

  // TO DO: Add delete button for user creator.

  return (
    <div className={styles.moment}>
      <div className={styles.momentHeading}>
        <p className={styles.momentTitle}>{title}</p>
        <svg className={styles.momentPhotoButton} onClick={() => setShowImage(true)}>
          <use xlinkHref={`${svg}#icon-image`} />
        </svg>
      </div>
      <div className={styles.momentText}>{text}</div>
      <div className={styles.reactToMoment}>
        <img src={like} alt="Like" />
      </div>
      <div className={styles.momentData}>
        {renderReactions()}
        <div className={styles.momentUserBox}>
          <p className={styles.momentUserName}>{nickname}</p> {/* LINK */}
          {formatDate()}
        </div>
        <ProfileImage profileImage={avatar} customStyle={styles.momentUserPhoto} />
      </div>
    </div>
  );
};

Moment.propTypes = {
  momentId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  reactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  createdAt: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUserId: state.auth.user._id,
});

export default connect(mapStateToProps, {
  deleteMoment: deleteMomentRequest,
  reactMoment: reactMomentRequest,
})(Moment);
