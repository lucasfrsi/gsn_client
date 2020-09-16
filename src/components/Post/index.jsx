import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingSpinner from '../UI/LoadingSpinner';
import defaultAvatar from '../../assets/images/default_avatar.png';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const Post = () => {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  return (
    <div className={styles.post}>

      <div className={styles.postUser}>
        {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
        <img
          src={/* posts.posts[0].user.avatar || */ defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <h4>xCloudFFVII</h4>
      </div>

      <div className={styles.postContent}>

        <div className={styles.postData}>

          <p className={styles.postText}>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
            the Semantics, a large language ocean. A small river named Duden flows by their place
            and supplies it with the necessary.
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
            the Semantics, a large language ocean. A small river named Duden flows by their place
            and supplies it with the necessary.
          </p>

          <div className={styles.postDate}>

            <p className={styles.postCreated}>
              Aug 25th at 10:13pm
            </p>

            <p className={styles.postEdited}>
              Edited
            </p>

          </div>

        </div>

        <div className={styles.postInteractions}>

          <div className={styles.postLikeComment}>
            <div className={styles.postLikeBox}>
              <div className={styles.postLike}>
                <svg>
                  <use xlinkHref={`${svg}#icon-thumbs-up`} />
                </svg>
                <span>17</span>
              </div>
              <div className={styles.postDislike}>
                <svg>
                  <use xlinkHref={`${svg}#icon-thumbs-down`} />
                </svg>
                <span>2</span>
              </div>
            </div>
            <div className={styles.postDiscussion}>
              <p className={styles.postDiscussionText}><span>34</span> Comments</p>
            </div>
          </div>

          <div className={styles.postEditDelete}>
            <svg>
              <use xlinkHref={`${svg}#icon-edit`} />
            </svg>
            <svg>
              <use xlinkHref={`${svg}#icon-trash`} />
            </svg>
          </div>

        </div>

      </div>

    </div>
  );
};

Post.propTypes = {

};

const mapStateToProps = (state) => ({
  userId: state.auth.user._id,
});

export default connect(mapStateToProps)(Post);
