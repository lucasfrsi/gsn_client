import React from 'react';

import styles from './style.scss';

import Post from '../../Post';

const Posts = () => (
  <div className={styles.posts}>
    <div className={styles.compose}>
      post will be here
    </div>
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </div>
);

export default Posts;
