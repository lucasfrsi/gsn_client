import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './style.scss';

import svg from '../../../assets/svg/sprite.svg';

import Post from '../../Post';
import Moment from '../../Moment';
import EditProfile from '../EditProfile';

const Overview = ({ posts, moments, user, loggedUser }) => {
  const [editMode, setEditMode] = useState(false);

  const renderLastPost = () => {
    const lastPostIndex = posts.length - 1;
    const lastPost = posts[lastPostIndex];
    return (
      <Post
        className={styles.recentActivityPost}
        _id={lastPost._id}
        text={lastPost.text}
        likes={lastPost.likes}
        comments={lastPost.comments}
        createdAt={lastPost.createdAt}
        updatedAt={lastPost.updatedAt}
        user={lastPost.user}
        nickname={user.nickname}
        avatar={user.avatar}
      />
    );
  };

  const renderLastMoment = () => {
    const lastMomentIndex = moments.length - 1;
    const lastMoment = moments[lastMomentIndex];
    return (
      <Moment
        momentId={lastMoment._id}
        title={lastMoment.title}
        text={lastMoment.text}
        imageUrl={lastMoment.imageUrl}
        reactions={lastMoment.reactions}
        createdAt={lastMoment.createdAt}
        userId={user._id}
        nickname={user.nickname}
        avatar={user.avatar}
      />
    );
  };

  useEffect(() => () => setEditMode(false), [user]);

  return (
    <div className={styles.overview}>
      {editMode && <EditProfile close={() => setEditMode(false)} />}
      {
        !editMode && (
          <>
            {loggedUser._id === user._id ? <button type="button" className={styles.editButton} onClick={() => setEditMode(true)}>Edit Profile</button> : null}
            {(user.profile.gamerData.bio || (user.profile.gamerData.genres && user.profile.gamerData.genres.length > 0) || (user.profile.gamerData.platforms && user.profile.gamerData.platforms.length > 0)) && (
            <div className={styles.gamerInfo}>
              <div className={styles.heading}>
                <h3>Gamer Info</h3>
              </div>
              <div className={styles.container}>
                {user.profile.gamerData.bio && (
                  <div className={styles.subContainer}>
                    <h4>Bio</h4>
                    <span className={styles.bio}>{user.profile.gamerData.bio}</span>
                  </div>
                )}
                {user.profile.gamerData.genres && user.profile.gamerData.genres.length > 0 && (
                  <div className={styles.subContainer}>
                    <h4 className={styles.genresHeading}>Favorite Genres</h4>
                    {user.profile.gamerData.genres.map((genre) => (
                      <span key={genre} className={styles.genre}>{genre}</span>
                    ))}
                  </div>
                )}
                {user.profile.gamerData.platforms && Object.keys(user.profile.gamerData.platforms).length > 0 && ( // check if platforms have value, the div is always showing.
                  <div className={styles.subContainer}>
                    <h4>Platforms</h4>
                    <div className={styles.platform}>
                      {Object.entries(user.profile.gamerData.platforms).map(([key, value]) => (
                        value ? (
                          <div key={key} className={styles.platform}>
                            <svg className={styles.icon}>
                              <use xlinkHref={`${svg}#icon-${key}`} />
                            </svg>
                            <span className={styles.platformId}>{value}</span>
                          </div>
                        ) : null))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}
            {user.profile.gamerData.twitchChannel && user.profile.gamerData.twitchChannel.link && (
              <div className={styles.twitch}>
                <div className={styles.heading}>
                  <h3>{user.profile.gamerData.twitchChannel.streamer ? 'My' : 'Favorite'} Twitch Channel</h3>
                </div>
                <div className={styles.twitchPlayerContainer}>
                  <iframe
                    title="twitch"
                    src={`https://player.twitch.tv/?channel=${user.profile.gamerData.twitchChannel.link}&parent=${window.location.hostname}&muted=true`} // USE window.location for image src / heroku ?
                    frameBorder="1"
                    scrolling="no"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
            <div className={`${styles.heading} ${styles.endHeading}`}>
              <h3>Recent Activity</h3>
            </div>
            <div className={styles.recentActivity}>
              {/* {posts.length !== 0 && renderLastPost()}
              {moments.length !== 0 && renderLastMoment()} */}
              {/* Create a better looking display for when user does not have posts and/or moments. (use emojis like moments) */}
              {posts.length === 0 && moments.length === 0 && (
                <div>
                  This user has not shared any post or moment up to this moment.
                </div>
              )}
            </div>
          </>
        )
      }
    </div>
  );
};

Overview.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  moments: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape().isRequired,
  loggedUser: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  moments: state.moments.moments,
  user: state.users.user,
  loggedUser: state.auth.user,
});

export default connect(mapStateToProps)(Overview);
