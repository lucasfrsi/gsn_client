import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPostRequest } from '../../store/actions/posts';

import styles from './style.scss';

const ComposePost = ({ createPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost(text);
    setText('');
  };

  return (
    <div className={styles.compose}>
      <div className={styles.saySomething}>
        <h3>Share your thoughts!</h3>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="text"
          placeholder="Type your post in here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className={styles.submitButton} value="Submit" />
      </form>
    </div>
  );
};

ComposePost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost: createPostRequest })(ComposePost);
