import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProfileRequest, deleteUserRequest } from '../../../store/actions/users';

import svg from '../../../assets/svg/sprite.svg';
import Backdrop from '../../UI/Backdrop';
import LoadingSpinner from '../../UI/LoadingSpinner';

import styles from './style.scss';

const GENRES = ['action', 'adventure', 'rpg', 'simulation', 'strategy', 'sports', 'mmo', 'card', 'fighting', 'platform'];
const PLATFORMS = {
  nintendoswitch: 'Nintendo Friend Code',
  playstation: 'PSN ID',
  xbox: 'Xbox Gamertag',
  epicgames: 'Epic Games Username',
  steam: 'Steam Friend Code',
  discord: 'Discord Username & Tag',
};

const EditProfile = ({ close }) => {
  const currentProfile = useSelector((state) => state.users.user.profile);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const updateProfile = (p) => dispatch(updateProfileRequest(p));
  const deleteUser = () => dispatch(deleteUserRequest());

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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

  const onPlatformChange = (event) => {
    setFormData({
      ...formData,
      platforms: {
        ...formData.platforms,
        [event.target.name]: event.target.value,
      },
    });
  };

  const onSocialChange = (event) => {
    setFormData({
      ...formData,
      social: {
        ...formData.social,
        [event.target.name]: event.target.value,
      },
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className={styles.editProfile}>
      {deleteConfirmation ? (
        <>
          <Backdrop />
          <div role="presentation" className={styles.deleteConfirmation}>
            <button type="button" disabled={loading} className={styles.closeButton} onClick={() => setDeleteConfirmation(false)}>
              <svg className={styles.closeButtonIcon}>
                <use xlinkHref={`${svg}#icon-cross`} />
              </svg>
            </button>
            <span className={styles.message}>
              Deleting your account will not only delete your profile but also all of your posts, moments and interactions, and once deleted there is no going back.
            </span>
            <span className={styles.message}>
              <strong>Are you sure you want to proceed?</strong>
            </span>
            <div className={styles.choiceButtons}>
              {loading ? <LoadingSpinner size={styles.spinnerSize} /> : <button type="button" onClick={deleteUser}>Delete</button>}
            </div>
          </div>
        </>
      ) : null}
      <h1>Edit Profile</h1>
      <h2>Add some changes to your profile</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="realName" className={styles.description}>What is your real name?</label>
          <input
            type="text"
            placeholder="Park B. Johnson"
            id="realName"
            name="realName"
            value={formData.realName}
            onChange={onChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.description}>Where do you live?</label>
          <input
            type="text"
            placeholder="Toronto, ON - Canada"
            id="location"
            name="location"
            value={formData.location}
            onChange={onChange}
          />
          <small>City, state and country are suggested (e.g., <strong>Columbia, SC - USA</strong>)</small>
        </div>
        <div className={styles.formGroup}>
          <p className={styles.description}>What kind of player are you?</p>
          <input
            type="radio"
            name="kind"
            id="casual"
            value="casual"
            onChange={onChange}
            checked={formData.kind === 'casual'}
          />
          <label htmlFor="casual" className={`${styles.radioLabel} ${formData.kind === 'casual' && styles.radioButtonChecked}`}>
            <span className={styles.radioButton} />
            Casual
          </label>
          <input
            type="radio"
            name="kind"
            id="pro"
            value="pro"
            onChange={onChange}
            checked={formData.kind === 'pro'}
          />
          <label htmlFor="pro" className={`${styles.radioLabel} ${formData.kind === 'pro' && styles.radioButtonChecked}`}>
            <span className={styles.radioButton} />
            Professional
          </label>
          <input
            type="radio"
            name="kind"
            id="none"
            value=""
            onChange={onChange}
            checked={formData.kind === ''}
          />
          <label htmlFor="none" className={`${styles.radioLabel} ${formData.kind === '' && styles.radioButtonChecked}`}>
            <span className={styles.radioButton} />
            None
          </label>
        </div>
        <div className={styles.formGroup}>
          <p className={styles.description}>Are you a streamer?</p>
          <input
            type="radio"
            name="streamer"
            id="streamerTrue"
            value="true"
            onChange={onBooleanChange}
            checked={formData.streamer === true}
          />
          <label htmlFor="streamerTrue" className={`${styles.radioLabel} ${formData.streamer === true && styles.radioButtonChecked}`}>
            <span className={styles.radioButton} />
            Yes
          </label>
          <input
            type="radio"
            name="streamer"
            id="streamerFalse"
            value="false"
            onChange={onBooleanChange}
            checked={formData.streamer === false}
          />
          <label htmlFor="streamerFalse" className={`${styles.radioLabel} ${formData.streamer === false && styles.radioButtonChecked}`}>
            <span className={styles.radioButton} />
            No
          </label>
        </div>
        <div className={styles.formGroup}>
          {formData.streamer ? <label htmlFor="link" className={styles.description}>What is your Twitch channel?</label> : <label htmlFor="link" className={styles.description}>What is your favorite Twitch streamer channel?</label>}
          <input
            type="text"
            placeholder="ninja"
            id="link"
            name="link"
            value={formData.link}
            onChange={onChange}
            className={styles.twitchPlaceholder}
          />
          <small>(1) Leave this field empty if you don&apos;t want to display the Twitch Player in your page</small>
          <small>(2) You must only write your channel name, not the entire address (e.g., https://www.twitch.tv/<strong>twitch</strong>)</small>
          <small>(3) Make sure you spell the channel name right, otherwise it will only display a black screen</small>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bio" className={styles.description}>Describe yourself</label>
          <div className={styles.textArea}>
            <textarea
              placeholder="Share a little about yourself =]"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={onChange}
              autoComplete="new-password"
            />{/* HANDLE 250 CHARACTERS LIMIT */}
            <span className={`${styles.characterCount} ${formData.bio.length > 250 && styles.characterCountExceed}`}>{formData.bio.length}/250</span>
          </div>
          <small>This might be what is keeping you from finding your duo</small>
        </div>
        <div className={styles.formGroup}>
          <p className={styles.descriptionNoMargin}>Select your favorite genres</p>
          <div className={styles.genres}>
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
                <label className={`${styles.genre} ${formData.genres.includes(genre) ? styles.selected : styles.notSelected}`} htmlFor={genre}>{genre}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <p className={styles.description}>
            Platforms
            <svg onClick={() => setShowPlatforms(!showPlatforms)} className={`${styles.showIcon} ${showPlatforms && styles.invertShowIcon}`}>
              <use xlinkHref={`${svg}#icon-chevron-down`} />
            </svg>
          </p>
          {showPlatforms && (
            <>
              <p className={styles.smallDescription}>Share how people can find you in other platforms</p>
              {Object.entries(formData.platforms).map(([key]) => (
                <div key={key} className={styles.platform}>
                  <label htmlFor={key}>
                    <svg className={styles.platformIcon}>
                      <use xlinkHref={`${svg}#icon-${key}`} />
                    </svg>
                  </label>
                  <input
                    type="text"
                    placeholder={PLATFORMS[key]}
                    id={key}
                    name={key}
                    value={formData.platforms[key]}
                    onChange={onPlatformChange}
                  />
                </div>
              ))}
            </>
          )}
        </div>
        <div className={styles.formGroup}>
          <p className={styles.description}>
            Social
            <svg
              onClick={(e) => {
                e.target.scrollIntoView();
                setShowSocial(!showSocial);
              }}
              className={`${styles.showIcon} ${showSocial && styles.invertShowIcon}`}
            >
              <use xlinkHref={`${svg}#icon-chevron-down`} />
            </svg>
          </p>
          {showSocial && (
            <>
              <p className={styles.smallDescription}>Manage your social network links</p>
              {Object.entries(formData.social).map(([key]) => (
                <div key={key} className={styles.social}>
                  <label htmlFor={key}>
                    <svg className={styles[key]}>
                      <use xlinkHref={`${svg}#icon-${key}`} />
                    </svg>
                  </label>
                  <input
                    type="text"
                    placeholder={key}
                    id={key}
                    name={key}
                    value={formData.social[key]}
                    onChange={onSocialChange}
                  />
                </div>
              ))}
              <small>Example: <strong>www.facebook.com/gamersx</strong> or <strong>https://facebook.com/gamersx</strong></small>
            </>
          )}
        </div>
        <div className={styles.buttons}>
          <button className={styles.delete} type="button" onClick={() => setDeleteConfirmation(true)}>Delete Account</button>
          <button className={styles.cancel} type="button" onClick={close}>Cancel</button>
          <input disabled={formData.bio.length > 250} className={styles.submit} type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  close: PropTypes.func.isRequired,
};

export default EditProfile;
