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
  loading,
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
          {profile.gamerData.platforms && Object.keys(profile.gamerData.platforms).length > 0 && (
            <div className={styles.platforms}>
              {Object.entries(profile.gamerData.platforms).map(([key, value]) => (value
                ? (
                  <svg key={key} className={styles.platformIcon}>
                    <use xlinkHref={`${svg}#icon-${key}`} />
                  </svg>
                ) : null))}
            </div>
          )}
        </div>
        <div className={styles.tags}>
          <div className={styles.featuredMemberTag}>#{profile.gamerData.kind && profile.gamerData.kind}player</div>
          {profile.gamerData.twitchChannel && profile.gamerData.twitchChannel.streamer && <div className={styles.featuredMemberTag}>#streamer</div>}
        </div>
        <p className={styles.featuredMemberDescription}>{profile.gamerData.bio}</p>
        <div className={styles.featuredMemberDetails}>
          <p className={styles.featuredMemberDetail}><span className={styles.countNumber}>{posts.length}</span>&nbsp;{posts.length === 1 ? 'Post' : 'Posts'}</p>
          <p className={styles.featuredMemberDetail}><span className={styles.countNumber}>{moments.length}</span>&nbsp;{moments.length === 1 ? 'Moment' : 'Moments'}</p>
          {formatDate()}
        </div>
      </div>
      <div className={styles.featuredMemberLabel}>Featured Member</div>
    </figure>
  );
};

FeaturedMember.propTypes = {
  featuredUser: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FeaturedMember;
