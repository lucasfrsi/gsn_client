import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCommentRequest } from '../../store/actions/posts';

import styles from './style.scss';

const CommentPost = ({ createComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // createComment(text); //POSTID and TEXT
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

CommentPost.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default connect(null, { createComment: createCommentRequest })(CommentPost);
