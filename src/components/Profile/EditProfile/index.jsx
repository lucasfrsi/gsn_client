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
      <h1>Edit Profile</h1>
      <p>Add some changes to your profile</p>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="realName">What is your name?</label>
          <input
            type="text"
            placeholder="Real Name"
            id="realName"
            name="realName"
            value={formData.realName}
            onChange={onChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Where do you live?</label>
          <input
            type="text"
            placeholder="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={onChange}
          />
          <small>City, state and country are suggested (e.g., <strong>Columbia, SC - USA</strong>)</small>
        </div>
        <div className={styles.formGroup}>
          <p>What kind of player are you?</p>
          <input
            type="radio"
            name="kind"
            id="casual"
            value="casual"
            onChange={onChange}
            checked={formData.kind === 'casual'}
          />
          <label htmlFor="casual">Casual</label>
          <input
            type="radio"
            name="kind"
            id="pro"
            value="pro"
            onChange={onChange}
            checked={formData.kind === 'pro'}
          />
          <label htmlFor="pro">Professional</label>
          <input
            type="radio"
            name="kind"
            id="none"
            value=""
            onChange={onChange}
            checked={formData.kind === ''}
          />
          <label htmlFor="none">None</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bio">Describe yourself</label>
          <textarea
            placeholder="Do you mind sharing a little about yourself? Max. 250 char"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={onChange}
          />
          <small>This might be what is separating you from finding your duo, right?</small>
        </div>
        <div className={styles.formGroup}>
          {/* PLATFORMS: Icon button to show */}
        </div>
        <div className={styles.formGroup}>
          {/* SOCIAL: Icon button to show */}
        </div>
        <button type="button" onClick={close}>Cancel</button>
        <input type="submit" value="Submit" />
      </form>
      <br />
      {formData.streamer}
      {formData.link}
      {formData.genres[0]}
      {formData.platforms.nintendoswitch}
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
