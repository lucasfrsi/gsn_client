import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPostsRequest } from '../../store/actions/posts';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Post from '../../components/Post';

import styles from './style.scss';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => ({
    posts: state.posts.posts,
    loading: state.posts.loading,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getPostsRequest());
  }, [dispatch]);

  return (
    <div className={styles.postsPage}>
      <h1>POSTS</h1>
      <h2>Here you find all the posts created by the community.</h2>
      <h3>
        Do you want to share your thoughts? Click&nbsp;
        <Link to="/my-profile/posts">
          here
        </Link>
        &nbsp;to create a post!
      </h3>
      {loading ? <LoadingSpinner size={styles.loadingSpinner} /> : null}
      <div className={styles.postsList}>
        {!loading && posts ? (
          posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              text={post.text}
              likes={post.likes}
              comments={post.comments}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              user={post.user._id}
              nickname={post.user.nickname}
              avatar={post.user.avatar}
              customStyle={styles.margin}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default Posts;
