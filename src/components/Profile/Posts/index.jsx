import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './style.scss';

import Post from '../../Post';
import Compose from '../../ComposePost';

const Posts = ({ posts, user, loggedUser }) => {
  const renderPosts = () => posts.map((post) => (
    <Post
      key={post._id}
      _id={post._id}
      text={post.text}
      likes={post.likes}
      comments={post.comments}
      createdAt={post.createdAt}
      updatedAt={post.updatedAt}
      user={post.user}
      nickname={user.nickname}
      avatar={user.avatar}
    />
  ));

  return (
    <div className={styles.posts}>
      {user._id === loggedUser._id ? <Compose /> : null}
      {renderPosts()}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape().isRequired,
  loggedUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  user: state.users.user,
  loggedUser: state.auth.user,
});

export default connect(mapStateToProps)(Posts);
