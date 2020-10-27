import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { likePostRequest, deletePostRequest } from '../../store/actions/posts';

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
  likePost,
  deletePost,
}) => {
  const [loading, setLoading] = useState(true);
  const [postLikes, setPostLikes] = useState(0);
  const [postDislikes, setPostDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(null);
  const [deletionConfirmation, setDeletionConfirmation] = useState(false);

  useEffect(() => {
    let likesCount = 0;
    let dislikesCount = 0;

    if (likes.length > 0) {
      likes.forEach((item) => {
        if (item.type === 'like') likesCount += 1;
        if (item.type === 'dislike') dislikesCount += 1;
        if (item.user === loggedUserId) {
          if (item.type === 'like') setIsLiked(true);
          if (item.type === 'dislike') setIsLiked(false);
        } else setIsLiked(null);
      });
    } else setIsLiked(null);

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

  const handleLike = (likeType) => {
    likePost(_id, likeType);
  };

  const handlePostDeletion = () => {
    deletePost(_id);
    setDeletionConfirmation(false);
  };

  const countComments = () => {
    let count;
    let comment = ' Comments';

    if (comments.length === 0) {
      count = 'NO';
    } else if (comments.length === 1) {
      count = 1;
      comment = 'Comment';
    } else {
      count = comments.length;
    }

    return <p className={styles.postDiscussionText}><span className={styles.discussionCount}>{count}</span><span className={styles.discussionComment}>{comment}</span></p>;
  };

  const formatDate = () => {
    // Aug 25th at 10:13pm
    const newDate = new Date(createdAt).toLocaleDateString();
    return newDate;
  };

  return (
    <div className={styles.post}>
      {deletionConfirmation && (
        <div className={styles.localBackdrop}>
          <div className={styles.centeredBox}>
            <p className={styles.confirmationMessage}>Are you sure you want to delete this post?</p>
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.yesButton}
                onClick={() => handlePostDeletion()}
              >Yes
              </button>
              <button
                type="button"
                className={styles.noButton}
                onClick={() => setDeletionConfirmation(false)}
              >No
              </button>
            </div>
          </div>
        </div>
      )}
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
        <Link to={`/profile/${user}`}>
          <h4>{nickname}</h4>
        </Link>
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
              Posted on {formatDate()}
            </p>

            {/* <p className={styles.postEdited}>
              // {/* Edited
              {updatedAt !== createdAt ? 'Edited' : null}
            </p> */}

          </div>

          <div className={styles.postInteractions}>

            <div className={styles.postLikeComment}>
              <div className={styles.postLikeBox}>
                <div className={`${styles.postLike} ${isLiked === true ? styles.postLikeActive : null}`}>
                  <svg
                    onClick={() => handleLike('like')}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <use xlinkHref={`${svg}#icon-thumbs-up`} />
                  </svg>
                  <span>{postLikes}</span>
                </div>
                <div className={`${styles.postDislike} ${isLiked === false ? styles.postDislikeActive : null}`}>
                  <svg
                    onClick={() => handleLike('dislike')}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <use xlinkHref={`${svg}#icon-thumbs-down`} />
                  </svg>
                  <span>{postDislikes}</span>
                </div>
              </div>
              <Link to={`/posts/${_id}`}>
                <div className={styles.postDiscussion}>
                  {countComments()}
                </div>
              </Link>
            </div>

            {user === loggedUserId ? (
              <div className={styles.postEditDelete}>
                <svg
                  onClick={() => setDeletionConfirmation(true)}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex="0"
                >
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
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUserId: state.auth.user._id,
});

export default connect(mapStateToProps, {
  likePost: likePostRequest,
  deletePost: deletePostRequest,
})(Post);
