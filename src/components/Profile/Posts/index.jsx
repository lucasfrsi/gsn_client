import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './style.scss';

import noactivity from '../../../assets/images/noactivity.png';

import Post from '../../Post';
import Compose from '../../ComposePost';

const Posts = ({ posts, user, loggedUser }) => {
  const renderPosts = () => {
    const postsArray = [...posts];
    postsArray.reverse();
    return (
      postsArray.length > 0 && (
        <div className={styles.userPosts}>
          {postsArray.map((post) => (
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
              customStyle={styles.margin}
            />
          ))}
        </div>
      )
    );
  };

  return (
    <div className={styles.posts}>
      {user._id === loggedUser._id ? <Compose /> : null}
      {renderPosts()}
      {posts.length === 0 && (
        <div className={styles.noActivity}>
          <img src={noactivity} alt="no activity" />
          {user._id === loggedUser._id ? (
            <p>You haven&apos;t shared any posts yet.</p>
          ) : (
            <p>This user hasn&apos;t shared any posts yet.</p>
          )}
        </div>
      )}
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
