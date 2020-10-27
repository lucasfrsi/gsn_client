import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomUserRequest } from '../../store/actions/users';

import FeaturedMember from '../FeaturedMember';

import styles from './style.scss';

const Welcome = ({ getRandomUser, featuredUser }) => {
  useEffect(() => {
    getRandomUser();
  }, [getRandomUser]);

  return (
    <div className={styles.welcome}>
      <div className={styles.heading}>
        <h1 className={styles.headingMain}>GAMERSX</h1>
        <h1 className={styles.headingSec}>IS WHERE GAMERS HANG OUT</h1>
      </div>
      <div className={styles.featuredUser}>
        {featuredUser ? <FeaturedMember featuredUser={featuredUser} /> : null}
      </div>
    </div>
  );
};

Welcome.propTypes = {
  getRandomUser: PropTypes.func.isRequired,
  featuredUser: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  featuredUser: state.users.featuredUser,
});

export default connect(mapStateToProps, {
  getRandomUser: getRandomUserRequest,
})(Welcome);
