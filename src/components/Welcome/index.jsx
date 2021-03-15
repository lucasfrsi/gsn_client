import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomUserRequest } from '../../store/actions/users';

import FeaturedMember from '../FeaturedMember';

import styles from './style.scss';

const Welcome = ({ getRandomUser, featuredUser, loading }) => {
  useEffect(() => {
    getRandomUser();
  }, [getRandomUser]);

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

Welcome.propTypes = {
  getRandomUser: PropTypes.func.isRequired,
  featuredUser: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  featuredUser: state.users.featuredUser,
  loading: state.users.loading,
});

export default connect(mapStateToProps, {
  getRandomUser: getRandomUserRequest,
})(Welcome);
