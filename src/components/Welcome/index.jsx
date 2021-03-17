import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getRandomUserRequest } from '../../store/actions/users';

import FeaturedMember from '../FeaturedMember';

import styles from './style.scss';

const Welcome = () => {
  const { featuredUser, loading } = useSelector((state) => ({
    featuredUser: state.users.featuredUser,
    loading: state.users.loading,
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomUserRequest());
  }, [dispatch]);

  return (
    <div className={styles.welcome}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <h1>Welcome to <span>GamersX</span></h1>
          <h2>Have fun</h2>
        </div>
        <div className={styles.rightSide}>
          CAROUSEL
        </div>
      </div>
      <div className={styles.featuredUser}>
        {featuredUser ? <FeaturedMember featuredUser={featuredUser} loading={loading} /> : null}
      </div>
    </div>
  );
};

export default Welcome;
