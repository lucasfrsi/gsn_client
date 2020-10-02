import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getPostRequest,
  editPostRequest,
} from '../../store/actions/posts';

import Loading from '../../components/UI/Loading';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import styles from './style.scss';

const Profile = ({ match, getUserProfile, loggedUserId, user, loading }) => {
  const [avatarIsLoading, setAvatarIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPost(match.params.id);
    return function cleanUp() {
      // cleanup
    };
  }, [getPost, match.params.id]);

  return (
    loading ? <Loading /> : (
      <>
        <p>test</p>
      </>
    )
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape().isRequired,
  }).isRequired,
  getUserProfile: PropTypes.func.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  user: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({
  post: state.posts.post,
  loading: state.posts.loading,
  loggedUserId: state.auth.user._id,
});

export default connect(mapStateToProps, { getUserProfile: getUserRequest })(Profile);
