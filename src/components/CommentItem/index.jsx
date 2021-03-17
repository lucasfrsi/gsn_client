import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { deleteCommentRequest } from '../../store/actions/posts';

import LoadingSpinner from '../UI/LoadingSpinner';
import defaultAvatar from '../../assets/images/default_avatar.png';
import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const CommentItem = ({
  postId,
  comment: { _id, text, user, date },
}) => {
  const dispatch = useDispatch();
  const deleteComment = (p, c) => dispatch(deleteCommentRequest(p, c));

  const { loggedUser, postUser } = useSelector((state) => ({
    loggedUser: state.auth.user._id,
    postUser: state.posts.post.user._id,
  }), shallowEqual);

  const [loading, setLoading] = useState(true);
  const [deletionConfirmation, setDeletionConfirmation] = useState(false);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultAvatar;
  };

  const formatDate = () => {
    // Aug 25th at 10:13pm
    const newDate = new Date(date).toLocaleDateString();
    return newDate;
  };

  const handlePostDeletion = () => {
    deleteComment(postId, _id);
    setDeletionConfirmation(false);
  };

  return (
    <div className={styles.post}>
      {deletionConfirmation && (
        <div className={styles.localBackdrop}>
          <div className={styles.centeredBox}>
            <p className={styles.confirmationMessage}>Are you sure you want to delete this comment?</p>
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
          src={`http://localhost:5000/${user.avatar}` || defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <Link to={`/profile/${user._id}`}>
          <h4>{user.nickname}</h4>
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
              {formatDate()}
            </p>

            {loggedUser === postUser || loggedUser === user._id ? (
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

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.shape().isRequired,
};

export default CommentItem;
