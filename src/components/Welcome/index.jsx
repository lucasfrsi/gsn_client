import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getRandomUserRequest } from '../../store/actions/users';

import FeaturedMember from '../FeaturedMember';
import Image from '../UI/Image';

import welcome from '../../assets/images/welcome.png';
import momentGif from '../../assets/images/moment_test.gif';

import styles from './style.scss';

const Welcome = () => {
  const { featuredUser, loading, nickname } = useSelector((state) => ({
    featuredUser: state.users.featuredUser,
    loading: state.users.loading,
    nickname: state.auth.user.nickname,
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomUserRequest());
  }, [dispatch]);

  return (
    <div className={styles.welcome}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.welcomeTxt}>
              <h1>Welcome <span>{nickname}</span></h1>
              <img src={welcome} alt="welcome" />
            </div>
            <p>Check the sections below to know more about the GamersX features, or simply navigate through the menu.</p>
            <p>Enjoy your stay :)</p>
          </div>
          <div className={styles.featuredUser}>
            {featuredUser ? <FeaturedMember featuredUser={featuredUser} loading={loading} /> : null}
          </div>
        </div>
        <hr />
        <div className={styles.row}>
          <img src={momentGif} alt="moment example" />
          <div className={`${styles.text} ${styles.right}`}>
            <h1>Profile</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptatibus similique accusantium nemo sit dolorem alias numquam, quam quos modi aliquid veniam nesciunt, nobis tenetur itaque doloremque repellat molestiae enim.
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.text} ${styles.left}`}>
            <h1>Moments</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptatibus similique accusantium nemo sit dolorem alias numquam, quam quos modi aliquid veniam nesciunt, nobis tenetur itaque doloremque repellat molestiae enim.
            </p>
          </div>
          <img src={momentGif} alt="moment example" />
        </div>
        <div className={styles.row}>
          <Image customStyle={styles.image} spinnerSize={styles.spinnerSize} />
          <div className={`${styles.text} ${styles.right}`}>
            <h1>Posts</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptatibus similique accusantium nemo sit dolorem alias numquam, quam quos modi aliquid veniam nesciunt, nobis tenetur itaque doloremque repellat molestiae enim.
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.text} ${styles.left}`}>
            <h1>Heroku and Default Images</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptatibus similique accusantium nemo sit dolorem alias numquam, quam quos modi aliquid veniam nesciunt, nobis tenetur itaque doloremque repellat molestiae enim.
            </p>
          </div>
          <Image customStyle={styles.image} spinnerSize={styles.spinnerSize} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
