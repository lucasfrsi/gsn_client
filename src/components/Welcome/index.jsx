import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getRandomUserRequest } from '../../store/actions/users';

import FeaturedMember from '../FeaturedMember';

import welcome from '../../assets/images/welcome.png';
import momentExample from '../../assets/images/moment_example.gif';
import profileExample from '../../assets/images/profile_example.jpg';
import postExample from '../../assets/images/post_example.jpg';
import defaultMoment from '../../assets/images/default_momentImage.png';
import gettingStarted from '../../assets/images/featured.png';

import styles from './style.scss';

const Welcome = () => {
  const { featuredUser, loading, user } = useSelector((state) => ({
    featuredUser: state.users.featuredUser,
    loading: state.users.loading,
    user: state.auth.user,
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomUserRequest());
  }, [dispatch]);

  return (
    <div className={styles.welcome}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.welcomeTxt}>
              <h1>Welcome <span>{user ? user.nickname : ''}</span></h1>
              <img src={welcome} alt="welcome" />
            </div>
            <p>Check the sections below to know more about the GamersX features and how to get started, or simply navigate through the menu.</p>
            <p>Enjoy your stay :&#41;</p>
          </div>
          <div className={styles.featuredUser}>
            {featuredUser ? <FeaturedMember featuredUser={featuredUser} loading={loading} /> : null}
          </div>
        </div>
        <hr />
        <div className={styles.gettingStarted}>
          <h1>Getting Started</h1>
          <img src={gettingStarted} alt="getting started" />
        </div>
        <div className={styles.row}>
          <img src={profileExample} alt="moment example" />
          <div className={`${styles.text} ${styles.right}`}>
            <h1>Profile</h1>
            <p>
              Your profile is where everyone goes to check about you! There you will share the
              platforms you are on like Steam, PSN and many others. You can upload your own
              avatar image and also a cover and also share all your social links, favorite Twitch channel,
              or your own, and it is also the place to go when you want to write posts or share moments.
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.text} ${styles.left}`}>
            <h1>Moments</h1>
            <p>
              Moments are a sort of mini-tweet you can share with all gamers.
              Take a picture of your favorite moment, give it a title, describe it
              with a few words and then voilà, just wait for people to react to it!
            </p>
          </div>
          <img src={momentExample} alt="moment example" />
        </div>
        <div className={styles.row}>
          <img src={postExample} alt="moment example" />
          <div className={`${styles.text} ${styles.right}`}>
            <h1>Posts</h1>
            <p>
              Posts in GamersX are just like in any other network website. You can write and share whatever you want and people can interact with it by commenting on your post, as well as liking or disliking it.
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.text} ${styles.left}`}>
            <h1>Heroku and Default Images</h1>
            <p>
              Since GamersX server is hosted on Heroku, you&apos;ll notice that
              some profiles will have the default avatar and cover, and the same goes
              for moments. The thing is that the Heroku filesystem is ephemeral, that
              means that any changes to the filesystem whilst the dyno is running only
              last until that dyno is shut down or restarted. Whenever a Heroku dyno goes
              inactive or simply sleeps, when it boots again it&apos;ll have a clean copy
              of the most recent deploy. All images stored in the meantime would be lost.
              The only exception is to the following 3 profiles: Darth Vader, Raze and Steve.
              All of their assets are part of the original deploy, so they&apos;ll always be
              available for you to take a look at.
            </p>
            <p>
              The default moment image is a homage to Legends of Runeterra, a card game by Riot Games.
            </p>
          </div>
          <img src={defaultMoment} alt="default moment" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
