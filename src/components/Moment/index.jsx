import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteMomentRequest, reactMomentRequest } from '../../store/actions/moments';

import ProfileImage from '../UI/ProfileImage';
import Backdrop from '../UI/Backdrop';
import Image from '../UI/Image';

import grr from '../../assets/images/reactions/grr.png';
import haha from '../../assets/images/reactions/haha.png';
import like from '../../assets/images/reactions/like.png';
import love from '../../assets/images/reactions/love.png';
import nani from '../../assets/images/reactions/nani.png';
import sob from '../../assets/images/reactions/sob.png';
import no from '../../assets/images/reactions/no.png';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const reactionTypesMap = {
  grr,
  haha,
  like,
  love,
  nani,
  sob,
};

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
  loggedUserId,
  deleteMoment,
  reactMoment,
}) => {
  const [showImage, setShowImage] = useState(false);
  const [showReactionsOptions, setShowReactionsOptions] = useState(false);
  const [deletionConfirmation, setDeletionConfirmation] = useState(false);
  const [userReaction, setUserReaction] = useState({
    type: 'like',
    didUserReact: false,
  });

  useEffect(() => {
    reactions.forEach(({ user, type }) => {
      if (loggedUserId === user) {
        setUserReaction({
          type,
          didUserReact: true,
        });
      }
    });
  }, [loggedUserId, reactions]);

  const reactionsRef = useRef(null);
  useEffect(() => {
    function handleClickOutsideForm(event) {
      if (reactionsRef.current && !reactionsRef.current.contains(event.target)) {
        setShowReactionsOptions(false);
      }
    }

    document.addEventListener('click', handleClickOutsideForm);

    return () => {
      document.removeEventListener('click', handleClickOutsideForm);
    };
  }, []);

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
      // eslint-disable-next-line no-param-reassign
      counter += 1;
      return counter;
    }, 0);

    const sortedReactions = Object.entries(reactionsObject).sort(([, a], [, b]) => b - a);
    // Top three reactions to the moment:
    const [first, second, third] = sortedReactions;

    let reactionsNoun = ' Reactions';
    if (reactionsCount === 1) reactionsNoun = ' Reaction';

    return (
      <div className={styles.momentReactionsBox}>
        <div className={styles.momentReactions}>
          {first[1] > 0 ? <img src={reactionTypesMap[first[0]]} alt={first[0]} className={styles.reactionImg1} /> : null}
          {second[1] > 0 ? <img src={reactionTypesMap[second[0]]} alt={second[0]} className={styles.reactionImg2} /> : null}
          {third[1] > 0 ? <img src={reactionTypesMap[third[0]]} alt={third[0]} className={styles.reactionImg3} /> : null}
          {reactionsCount === 0 ? <img src={no} alt="no reactions" className={styles.reactionImg} /> : null}
        </div>
        <div className={styles.reactionCount}><span>{reactionsCount === 0 ? 'No' : reactionsCount}</span>{reactionsNoun}</div>
      </div>
    );
  };
  // CONSIDER CHANGING TO USE EFFECT + USESTATE for user reaction to have border.

  const handleMomentDeletion = () => {
    deleteMoment(momentId);
    setDeletionConfirmation(false);
  };

  let enterTimeout;
  let leaveTimeout;
  const handleReactToMoment = () => {
    clearTimeout(leaveTimeout);
    enterTimeout = setTimeout(() => {
      setShowReactionsOptions(true);
    }, 800);
  };

  const stopTimeout = () => {
    clearTimeout(enterTimeout);
    leaveTimeout = setTimeout(() => {
      setShowReactionsOptions(false);
    }, 400);
  };

  const handleReactionChoice = (reactionType) => {
    reactMoment(momentId, reactionType);
    setShowReactionsOptions(false);
    clearTimeout(enterTimeout);
  };

  const handleReactionChoice2 = (reactionType) => {
    reactMoment(momentId, reactionType);
    setShowReactionsOptions(false);
    if (userReaction.didUserReact) {
      setUserReaction({
        type: 'like',
        didUserReact: false,
      });
    }
    clearTimeout(enterTimeout);
  };

  return (
    <>
      {showImage ? (
        <>
          <Backdrop onClick={() => setShowImage(false)} />
          <div className={styles.imageModal}>
            <svg className={styles.closeModal} onClick={() => setShowImage(false)}>
              <use xlinkHref={`${svg}#icon-cross`} />
            </svg>
            {/* <img className={styles.momentImage} src={imageUrl} alt="moment" /> */}
            <Image customStyle={styles.momentImage} spinnerSize={styles.imageLoading} image={imageUrl} alt="moment" />
          </div>
        </>
      ) : null}
      <div className={styles.moment}>
        {deletionConfirmation && (
          <div className={styles.localBackdrop}>
            <div className={styles.centeredBox}>
              <p className={styles.confirmationMessage}>Are you sure you want to delete this moment?</p>
              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.yesButton}
                  onClick={() => handleMomentDeletion()}
                >Yes
                </button>
                <button
                  type="button"
                  className={styles.noButton}
                  onClick={() => setDeletionConfirmation(false)}
                >No
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={styles.momentHeading}>
          <p className={styles.momentTitle}>{title}</p>
          {loggedUserId === userId ? (
            <svg className={styles.momentDeleteButton} onClick={() => setDeletionConfirmation(true)}>
              <use xlinkHref={`${svg}#icon-trash`} />
            </svg>
          ) : null}
          <svg className={styles.momentPhotoButton} onClick={() => setShowImage(true)}>
            <use xlinkHref={`${svg}#icon-image`} />
          </svg>
        </div>
        <div className={styles.momentText}>{text}</div>
        <div ref={reactionsRef} className={styles.reactToMoment} onMouseEnter={() => handleReactToMoment()} onMouseLeave={() => stopTimeout()}>
          {showReactionsOptions ? (
            <div className={styles.reactionsOptions}>
              {Object.entries(reactionTypesMap).map(([key, value]) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                key !== userReaction.type ? <img className={styles.reactionOption} key={key} src={value} alt={key} onClick={() => handleReactionChoice(key)} onKeyDown={() => {}} /> : null))}
            </div>
          ) : null}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img className={`${styles.playerReaction} ${userReaction.didUserReact ? styles.reacted : null}`} src={reactionTypesMap[userReaction.type]} alt={userReaction.type} onClick={() => handleReactionChoice2(userReaction.type)} onKeyDown={() => {}} />
        </div>
        <div className={styles.momentData}>
          {renderReactions()}
          <div className={styles.momentUserBox}>
            <Link to={`/profile/${userId}`}>
              <p className={styles.momentUserName}>{nickname}</p>
            </Link>
            {formatDate()}
          </div>
          <ProfileImage profileImage={avatar} customStyle={styles.momentUserPhoto} />
        </div>
      </div>
    </>
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
  loggedUserId: PropTypes.string.isRequired,
  deleteMoment: PropTypes.func.isRequired,
  reactMoment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUserId: state.auth.user._id,
});

export default connect(mapStateToProps, {
  deleteMoment: deleteMomentRequest,
  reactMoment: reactMomentRequest,
})(Moment);
