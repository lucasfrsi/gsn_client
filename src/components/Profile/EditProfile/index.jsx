import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProfileRequest } from '../../../store/actions/users';

import styles from './style.scss';

const EditProfile = ({ close, updateProfile, currentProfile }) => {
  const [formData, setFormData] = useState({
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

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile(formData);
  };

  return (
    <div>
      EDIT PROFILE
      <br />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Real Name"
          name="realName"
          value={formData.realName}
          onChange={onChange}
        />
        <input type="submit" />
      </form>
      <br />
      {formData.realName}
      {formData.location}
      {formData.kind}
      {formData.platforms.nintendoswitch}
      {formData.genres[0]}
      {formData.streamer}
      {formData.link}
      {formData.bio}
      {formData.social.facebook}
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
