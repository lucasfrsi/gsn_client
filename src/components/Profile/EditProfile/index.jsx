import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProfileRequest } from '../../../store/actions/users';

import styles from './style.scss';

const EditProfile = ({ close, updateProfile, currentProfile }) => {
  const [profile, setProfile] = useState({
    realName: currentProfile.personalData.realName,
    location: currentProfile.personalData.location,
    kind: currentProfile.gamerData.kind,
    platforms: {
      ...currentProfile.gamerData.platforms,
    },
    genres: [...currentProfile.gamerData.genres],
    streamer: currentProfile.gamerData.twitchChannel.streamer,
    link: currentProfile.gamerData.twitchChannel.link,
    bio: currentProfile.gamerData.bio,
    social: {
      ...currentProfile.social,
    },
  });

  return (
    <div>
      EDIT PROFILE
      {profile.realName}
      {profile.location}
      {profile.kind}
      {profile.platforms.nintendoswitch}
      {profile.genres[0]}
      {profile.streamer}
      {profile.link}
      {profile.bio}
      {profile.social.facebook}
    </div>
  );
};

EditProfile.propTypes = {
  close: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  currentProfile: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  currentProfile: state.users.user.profile,
});

export default connect(mapStateToProps, {
  updateProfile: updateProfileRequest,
})(EditProfile);
