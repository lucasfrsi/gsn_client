import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostItem from '../../components/PostItem';
import CommentForm from '../../components/CommentForm';
import CommentItem from '../../components/CommentItem';

import { getPostRequest } from '../../store/actions/posts';

import Loading from '../../components/UI/Loading';

import styles from './style.scss';

const Post = ({ match, loading, post, getPost }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

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
  getPost: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  post: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  post: state.posts.post,
});

export default connect(mapStateToProps, { getPost: getPostRequest })(Post);
