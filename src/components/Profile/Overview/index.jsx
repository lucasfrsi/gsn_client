import React from 'react';

import styles from './style.scss';

import Post from '../../Post';
import Moment from '../../Moment';

const Overview = () => (
  <div className={styles.overview}>

    <div className={styles.container}>
      <div className={styles.gaming}>
        <div className={styles.heading}>
          <h3>Gaming Info</h3>
        </div>
      </div>
      <div className={styles.bio}>
        <div className={styles.heading}>
          <h3>Bio</h3>
        </div>
      </div>
      <div className={styles.twitch}>
        <div className={styles.heading}>
          <h3>Twitch Channel</h3>
        </div>
        <iframe
          title="twitch"
          src={`https://player.twitch.tv/?channel=disguisedtoast&parent=${window.location.hostname}&muted=true`}
          height="300"
          width="400"
          frameBorder="1"
          scrolling="no"
          allowFullScreen
        />
      </div>
    </div>

    <div className={`${styles.heading} ${styles.endHeading}`}>
      <h3>Recent Activity</h3>
    </div>
    <div className={styles.latestActivity}>
      <Post />
      <Moment />
    </div>
  </div>
);

export default Overview;

// <div>
// <h2 className={styles.ctaBookNow}>
//   TWITCH.TV - LIVE CHANNEL
// </h2>
// </div>
