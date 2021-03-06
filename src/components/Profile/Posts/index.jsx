import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import styles from './style.scss';

import noactivity from '../../../assets/images/noactivity.png';

import Post from '../../Post';
import Compose from '../../ComposePost';

const Posts = () => {
  const { posts, user, loggedUser } = useSelector((state) => ({
    posts: state.posts.posts,
    user: state.users.user,
    loggedUser: state.auth.user,
  }), shallowEqual);

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

export default Posts;
