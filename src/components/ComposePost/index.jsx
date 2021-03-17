import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostRequest } from '../../store/actions/posts';

import styles from './style.scss';

const ComposePost = () => {
  const dispatch = useDispatch();
  const createPost = (t) => dispatch(createPostRequest(t));

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

export default ComposePost;
