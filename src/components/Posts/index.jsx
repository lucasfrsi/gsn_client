import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsRequestAction, deletePostRequestAction } from '../../store/actions/posts';

import NewPostForm from '../NewPostForm';

import styles from './style.scss';

const Posts = ({ posts, getPostsRequest, deletePostRequest }) => {
  const onGetPostsRequest = useCallback(() => getPostsRequest(), [getPostsRequest]);

  useEffect(() => {
    onGetPostsRequest();
  }, [onGetPostsRequest]);

  const handleDeletePostClick = (postId) => {
    deletePostRequest(postId);
  };

  return (
    <div className={styles.posts}>
      <h1>POSTS</h1>
      <NewPostForm />
      <hr />
      {posts.postsList.map((post) => (
        <div key={post.id} className={styles.card}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button type="button" onClick={() => handleDeletePostClick(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.shape({
    postsList: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.number,
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
  }).isRequired,
  getPostsRequest: PropTypes.func.isRequired,
  deletePostRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPostsRequest: () => dispatch(getPostsRequestAction()),
  deletePostRequest: (postId) => dispatch(deletePostRequestAction(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
