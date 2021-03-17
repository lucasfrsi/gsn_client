import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMomentsRequest } from '../../store/actions/moments';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Moment from '../../components/Moment';

import styles from './style.scss';

const Moments = () => {
  const dispatch = useDispatch();
  const { moments, loading } = useSelector((state) => ({
    moments: state.moments.moments,
    loading: state.moments.loading,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getMomentsRequest());
  }, [dispatch]);

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

export default Moments;
