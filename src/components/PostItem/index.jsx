import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultUrl from '../../config/defaultUrl';

import { editPostRequest } from '../../store/actions/posts';

import LoadingSpinner from '../UI/LoadingSpinner';
import defaultAvatar from '../../assets/images/default_avatar.png';
import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const PostItem = ({
  text,
  createdAt,
  nickname,
  avatar,
  postId,
  userId,
}) => {
  const loggedUserId = useSelector((state) => state.auth.user._id);

  const dispatch = useDispatch();
  const editPost = (p, t) => dispatch(editPostRequest(p, t));

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);

  useEffect(() => {
    setEditText(text);
  }, [text]);

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
    const newDate = new Date(createdAt).toLocaleDateString();
    return newDate;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editPost(postId, editText);
    setEditMode(false);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postUser}>
        {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
        <img
          src={`${defaultUrl}${avatar}` || defaultAvatar}
          alt="User"
          className={styles.userPhoto}
          onLoad={handleOnLoad}
          onError={handleOnError}
          style={{
            display: loading ? 'none' : 'inline-block',
          }}
        />
        <Link to={`/profile/${userId}`}>
          <h4>{nickname}</h4>
        </Link>
      </div>

      <div className={styles.postContent}>

        <div className={styles.postData}>

          {editMode ? (
            <form className={styles.editForm} onSubmit={(e) => handleSubmit(e)}>
              <textarea
                className={styles.postEditText}
                rows="4"
                name="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className={styles.buttons}>
                <input
                  className={styles.cancelButton}
                  type="button"
                  value="Cancel"
                  onClick={() => {
                    setEditMode(false);
                    setEditText(text);
                  }}
                />
                <input className={styles.confirmButton} type="submit" value="Confirm" />
              </div>
            </form>
          ) : (
            <p className={styles.postText}>
              {text}
            </p>
          )}

        </div>

        <div>
          <div className={styles.postDate}>

            <p className={styles.postCreated}>
              {/* Aug 25th at 10:13pm */}
              {formatDate()}
            </p>

            {loggedUserId === userId ? (
              <div className={`${styles.postEditDelete} ${editMode && styles.editButtonHidden}`}>
                <svg
                  onClick={() => setEditMode(true)}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex="0"
                >
                  <use xlinkHref={`${svg}#icon-edit`} />
                </svg>
              </div>
            ) : null}

          </div>
        </div>

      </div>

    </div>
  );
};

PostItem.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PostItem;
