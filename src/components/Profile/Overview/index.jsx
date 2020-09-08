import React from 'react';

import styles from './style.scss';

import svg from '../../../assets/svg/sprite.svg';

import Post from '../../Post';
import Moment from '../../Moment';

const Overview = () => (
  <div className={styles.overview}>

    <div className={styles.container}>
      <div className={styles.gamerInfo}>
        <div className={styles.heading}>
          <h3>Gamer Info</h3>
        </div>
        <div className={styles.gamerData}>
          <h4 className={styles.gamerDataHeading}>BIO</h4>
          <p>
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure r
          </p>
          <br />
          <p>Favorite Game: <span>League of Legends</span></p>
          <p>Recently Played: <span>Fortnite</span></p>
        </div>
      </div>
      <div className={styles.gaming}>
        <div className={styles.heading}>
          <h3>Platforms</h3>
        </div>
        <div className={styles.gamingData}>
          {/* <p className={styles.gamingDataTitle}>This gamer is part of the following platforms: </p> */}
          <div className={styles.platform}>
            <svg className={styles.icon}>
              <use xlinkHref={`${svg}#icon-nintendoswitch`} />
            </svg>
            <p className={styles.gamingDataInfo}><span>Nintendo</span> as <span>Cloud</span></p>
          </div>
          <div className={styles.platform}>
            <svg className={styles.icon}>
              <use xlinkHref={`${svg}#icon-playstation`} />
            </svg>
            <p className={styles.gamingDataInfo}><span>Playstation Network</span> as <span>xCloudyTales</span></p>
          </div>
          <div className={styles.platform}>
            <svg className={styles.icon}>
              <use xlinkHref={`${svg}#icon-xbox`} />
            </svg>
            <p className={styles.gamingDataInfo}><span>Xbox Live</span> as <span>xCloud#4321</span></p>
          </div>
          <div className={styles.platform}>
            <svg className={styles.icon}>
              <use xlinkHref={`${svg}#icon-epicgames`} />
            </svg>
            <p className={styles.gamingDataInfo}><span>Epic Games</span> as <span>Cloud</span></p>
          </div>
          <div className={styles.platform}>
            <svg className={styles.icon}>
              <use xlinkHref={`${svg}#icon-steam`} />
            </svg>
            <p className={styles.gamingDataInfo}><span>Steam</span> as <span>Cloud</span></p>
          </div>
          <div className={styles.platform}>
            <svg className={styles.icon}>
              <use xlinkHref={`${svg}#icon-discord`} />
            </svg>
            <p className={styles.gamingDataInfo}><span>Discord</span> as <span>xCloudFF#1234</span></p>
          </div>
        </div>
      </div>
      <div className={styles.twitch}>
        <div className={styles.heading}>
          <h3>Twitch Channel</h3>
        </div>
        <iframe
          title="twitch"
          src={`https://player.twitch.tv/?channel=swimstrim&parent=${window.location.hostname}&muted=true`}
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
    <div className={styles.recentActivity}>
      <Post className={styles.recentActivityPost} />
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