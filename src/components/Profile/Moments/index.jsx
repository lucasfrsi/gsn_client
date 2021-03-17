import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import styles from './style.scss';

import noactivity from '../../../assets/images/noactivity.png';

import Moment from '../../Moment';
import Compose from '../../NewMoment';

const Moments = () => {
  const { moments, user, loggedUser } = useSelector((state) => ({
    moments: state.moments.moments,
    user: state.users.user,
    loggedUser: state.auth.user,
  }), shallowEqual);

  const renderMoments = () => {
    const momentsArray = [...moments];
    momentsArray.reverse();
    return (
      momentsArray.length > 0 && (
        <div className={styles.userMoments}>
          {momentsArray.map((moment) => (
            <Moment
              key={moment._id}
              momentId={moment._id}
              userId={user._id}
              nickname={user.nickname}
              avatar={user.avatar}
              title={moment.title}
              text={moment.text}
              imageUrl={moment.imageUrl}
              reactions={moment.reactions}
              createdAt={moment.createdAt}
              customStyle={styles.margin}
            />
          ))}
        </div>
      )
    );
  };

  return (
    <div className={styles.moments}>
      {user._id === loggedUser._id ? <Compose /> : null}
      {renderMoments()}
      {moments.length === 0 && (
        <div className={styles.noActivity}>
          <img src={noactivity} alt="no activity" />
          {user._id === loggedUser._id ? (
            <p>You haven&apos;t shared any moments yet.</p>
          ) : (
            <p>This user hasn&apos;t shared any moments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Moments;
