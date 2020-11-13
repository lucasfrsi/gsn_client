import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProfileRequest } from '../../../store/actions/users';

import styles from './style.scss';

const GENRES = ['action', 'adventure', 'rpg', 'simulation', 'strategy', 'sports', 'mmo', 'card', 'fighting', 'platform'];

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

  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onBooleanChange = (event) => {
    setFormData({
      ...formData,
      streamer: event.target.value === 'true',
    });
  };

  const onGenreChange = (event) => {
    const checkbox = event.target;
    if (checkbox.checked === true) {
      setFormData({
        ...formData,
        genres: formData.genres.filter((genre) => genre !== checkbox.name),
      });
      checkbox.checked = false;
    } else {
      setFormData({
        ...formData,
        genres: [...formData.genres, checkbox.name],
      });
      checkbox.checked = true;
    }
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
          <p>Are you a streamer?</p>
          <input
            type="radio"
            name="streamer"
            id="streamerTrue"
            value="true"
            onChange={onBooleanChange}
            checked={formData.streamer === true}
          />
          <label htmlFor="streamerTrue">Yes</label>
          <input
            type="radio"
            name="streamer"
            id="streamerFalse"
            value="false"
            onChange={onBooleanChange}
            checked={formData.streamer === false}
          />
          <label htmlFor="streamerFalse">No</label>
        </div>
        <div className={styles.formGroup}>
          {formData.streamer ? <label htmlFor="link">What is your Twitch channel?</label> : <label htmlFor="link">What is your favorite Twitch streamer channel?</label>}
          <input
            type="text"
            placeholder="Twitch Channel Name"
            id="link"
            name="link"
            value={formData.link}
            onChange={onChange}
          />
          <small>(1) Leave this field empty if you don&apos;t want to display the Twitch Player in your page</small>
          <small>(2) You must only write your channel name, not the entire address (e.g., https://www.twitch.tv/<strong>twitch</strong>)</small>
          <small>(3) Make sure you spell the channel name right, otherwise it will only display a black screen</small>
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
          <small>This might be what is separating you from finding your duo...</small>
        </div>
        <div className={styles.formGroup}>
          <p>Select your favorite genres</p>
          {GENRES.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                name={genre}
                id={genre}
                checked={!formData.genres.includes(genre)}
                onChange={onGenreChange}
                style={{ display: 'none' }}
              />
              <label className={formData.genres.includes(genre) ? styles.selected : styles.notSelected} htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>
        <div className={styles.formGroup}>
          <p>Platforms</p>
          {/* PLATFORMS: Icon button to show */}
        </div>
        <div className={styles.formGroup}>
          <p>Social</p>
          {/* SOCIAL: Icon button to show */}
        </div>
        <button type="button" onClick={close}>Cancel</button>
        <input type="submit" value="Submit" />
      </form>
      <br />
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
