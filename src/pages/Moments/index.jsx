import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMomentsRequest } from '../../store/actions/moments';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Moment from '../../components/Moment';

import styles from './style.scss';

const Moments = ({ getMoments, moments, loading }) => {
  useEffect(() => {
    getMoments();
  }, [getMoments]);

  return (
    <div className={styles.postsPage}>
      <h1>MOMENTS</h1>
      <h2>Gamers&apos; favorite moments are all found here!</h2>
      <h3>
        Click&nbsp;
        <Link to="/my-profile/moments">
          here
        </Link>
        &nbsp;to share yours!
      </h3>
      {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
      <div className={styles.postsList}>
        {!loading && moments ? (
          moments.map((moment) => (
            <Moment
              key={moment._id}
              momentId={moment._id}
              userId={moment.user._id}
              title={moment.title}
              text={moment.text}
              imageUrl={moment.imageUrl}
              reactions={moment.reactions}
              createdAt={moment.createdAt}
              avatar={moment.user.avatar}
              nickname={moment.user.nickname}
              customStyle={styles.margin}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

Moments.propTypes = {
  getMoments: PropTypes.func.isRequired,
  moments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  moments: state.moments.moments,
  loading: state.moments.loading,
});

export default connect(mapStateToProps, {
  getMoments: getMomentsRequest,
})(Moments);
