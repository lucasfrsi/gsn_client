import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import PostItem from '../../components/PostItem';
import CommentForm from '../../components/CommentForm';
import CommentItem from '../../components/CommentItem';

import { getPostRequest } from '../../store/actions/posts';

import Loading from '../../components/UI/Loading';

import styles from './style.scss';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => ({
    loading: state.posts.loading,
    post: state.posts.post,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getPostRequest(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    loading || post === null ? <Loading /> : (
      <div className={styles.postPage}>
        <PostItem
          postId={post._id}
          userId={post.user._id}
          text={post.text}
          createdAt={post.createdAt}
          nickname={post.user.nickname}
          avatar={post.user.avatar}
          showActions={false}
        />
        <CommentForm postId={post._id} />
        <div className={styles.comments}>
          {post.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </div>
    )
  );
};

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
};

export default Post;
