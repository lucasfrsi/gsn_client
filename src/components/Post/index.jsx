import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingSpinner from '../UI/LoadingSpinner';
import defaultAvatar from '../../assets/images/default_avatar.png';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const Post = ({
  _id,
  text,
  likes,
  comments,
  createdAt,
  updatedAt,
  user,
  nickname,
  avatar,
  loggedUserId,
}) => {
  const [loading, setLoading] = useState(true);
  const [postLikes, setPostLikes] = useState(0);
  const [postDislikes, setPostDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    let likesCount = 0;
    let dislikesCount = 0;

    likes.forEach((item) => {
      if (item.type === 'like') likesCount += 1;
      if (item.type === 'dislike') dislikesCount += 1;
      if (item.user === loggedUserId) {
        if (item.type === 'like') setIsLiked(true);
        if (item.type === 'dislike') setIsLiked(false);
      }
    });

    setPostLikes(likesCount);
    setPostDislikes(dislikesCount);
  }, [likes, loggedUserId]);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  const countComments = () => {
    let count;
    let comment = ' Comments';

    if (comments.length === 0) {
      count = 'No';
    } else if (comments.length === 1) {
      count = 1;
      comment = ' Comment';
    } else {
      count = comments.length;
    }

    return <p className={styles.postDiscussionText}><span>{count}</span>{comment}</p>;
  };

  return (
    <div className={styles.post}>
      <div className={styles.postUser}>
        {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
        <img
          src={avatar || defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <h4>{nickname}</h4>
      </div>

      <div className={styles.postContent}>

        <div className={styles.postData}>

          <p className={styles.postText}>
            {text}
          </p>

        </div>

        <div>
          <div className={styles.postDate}>

            <p className={styles.postCreated}>
              {/* Aug 25th at 10:13pm */}
              {createdAt}
            </p>

            <p className={styles.postEdited}>
              {/* Edited */}
              {updatedAt !== createdAt ? 'Edited' : null} {/* WRONG, CHANGE LOGIC */}
            </p>

          </div>

          <div className={styles.postInteractions}>

            <div className={styles.postLikeComment}>
              <div className={styles.postLikeBox}>
                <div className={`${styles.postLike} ${isLiked === true ? styles.postLikeActive : null}`}>
                  <svg>
                    <use xlinkHref={`${svg}#icon-thumbs-up`} />
                  </svg>
                  <span>{postLikes}</span>
                </div>
                <div className={`${styles.postDislike} ${isLiked === false ? styles.postDislikeActive : null}`}>
                  <svg>
                    <use xlinkHref={`${svg}#icon-thumbs-down`} />
                  </svg>
                  <span>{postDislikes}</span>
                </div>
              </div>
              <div className={styles.postDiscussion}>
                {countComments()}
              </div>
            </div>

            {user === loggedUserId ? (
              <div className={styles.postEditDelete}>
                <svg>
                  <use xlinkHref={`${svg}#icon-edit`} />
                </svg>
                <svg>
                  <use xlinkHref={`${svg}#icon-trash`} />
                </svg>
              </div>
            ) : null}

          </div>
        </div>

      </div>

    </div>
  );
};

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  loggedUserId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUserId: state.auth.user._id,
});

export default connect(mapStateToProps)(Post);
