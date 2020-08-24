import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPostRequestAction } from '../../store/actions/posts';

import styles from './style.scss';

const NewPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title, body);
    setTitle('');
    setBody('');
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleBodyChange = (event) => setBody(event.target.value);

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input type="text" name="title" value={title} onChange={handleTitleChange} required />
        </label>
        <label htmlFor="body">
          Body
          <textarea rows="5" type="text" name="body" value={body} onChange={handleBodyChange} required />
        </label>
        <button type="submit">Submit Post!</button>
      </form>
    </div>
  );
};

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (title, body) => dispatch(createPostRequestAction(title, body)),
});

export default connect(null, mapDispatchToProps)(NewPostForm);
