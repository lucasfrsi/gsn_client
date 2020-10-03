import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCommentRequest } from '../../store/actions/posts';

import styles from './style.scss';

const CommentForm = ({ createComment, postId }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment(postId, text);
    setText('');
  };

  return (
    <div className={styles.comment}>
      <div className={styles.leaveAComment}>
        <h3>Leave a comment!</h3>
      </div>
      <form className={styles.commentForm} onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="text"
          placeholder="Type your comment in here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className={styles.submitButton} value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { createComment: createCommentRequest })(CommentForm);
