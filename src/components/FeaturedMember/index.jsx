import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileImage from '../UI/ProfileImage';
import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const FeaturedMember = ({
  featuredUser: {
    _id,
    avatar,
    nickname,
    createdAt,
    moments,
    posts,
    profile,
  },
}) => {
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

    return <p className={styles.featuredMemberDetailDate}>{`Joined on ${month} ${day}`}<sup>{ordinalSuperscript}</sup>, {year}</p>;
  };

  return (
    <figure className={styles.featuredMemberCard}>
      <div className={styles.featuredMemberHero}>
        <ProfileImage profileImage={avatar} customStyle={styles.featuredMemberImg} spinnerSize={styles.loadingSpinnerSize} />
      </div>
      <div className={styles.featuredMemberContent}>
        <div className={styles.featuredMemberTitle}>
          <Link to={`/profile/${_id}`}>
            <h1 className={styles.featuredMemberHeading}>{nickname}</h1>
          </Link>
          <div className={styles.platforms}>
            <svg className={styles.platformIcon}>
              <use xlinkHref={`${svg}#icon-playstation`} />
            </svg>
            <svg className={styles.platformIcon}>
              <use xlinkHref={`${svg}#icon-epicgames`} />
            </svg>
          </div>
        </div>
        <div className={styles.featuredMemberTag}>#casualplayer</div>
        <p className={styles.featuredMemberDescription}>{profile.gamerData.bio}</p>
        <div className={styles.featuredMemberDetails}>
          <p className={styles.featuredMemberDetail}><span className={styles.countNumber}>{posts.length}</span>&nbsp;Posts</p>
          <p className={styles.featuredMemberDetail}><span className={styles.countNumber}>{moments.length}</span>&nbsp;Moments</p>
          {formatDate()}
        </div>
      </div>
      <div className={styles.featuredMemberLabel}>Featured Member</div>
    </figure>
  );
};

FeaturedMember.propTypes = {
  featuredUser: PropTypes.shape().isRequired,
};

export default FeaturedMember;
