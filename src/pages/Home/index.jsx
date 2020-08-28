import React from 'react';

import styles from './style.scss';

import image from '../../assets/images/avatar.jpg';
import nani from '../../assets/images/reactions/nani.png';
import love from '../../assets/images/reactions/love.png';
import grr from '../../assets/images/reactions/grr.png';
import sob from '../../assets/images/reactions/sob.png';
import haha from '../../assets/images/reactions/haha.png';
import like from '../../assets/images/reactions/like.png';
import icons from '../../assets/svg/sprite.svg';

import Moment from '../../components/Moment';
import Post from '../../components/Post';

const Home = () => (
  <>
    <div className={styles.cover}>
      {/* <img src={image} alt="" /> */}
      <img src="https://picsum.photos/1000/400" alt="" />
    </div>

    <div className={styles.overview}>

      <h1>Jade Curtiss</h1>

      <div className={styles.stars}>
        <svg className={styles.starIcon}>
          <use xlinkHref={`${icons}#icon-flash`} />
        </svg>
        <svg className={styles.starIcon}>
          <use xlinkHref={`${icons}#icon-flash`} />
        </svg>
        <svg className={styles.starIcon}>
          <use xlinkHref={`${icons}#icon-flash`} />
        </svg>
        <svg className={styles.starIcon}>
          <use xlinkHref={`${icons}#icon-flash`} />
        </svg>
        <svg className={styles.starIcon}>
          <use xlinkHref={`${icons}#icon-flash`} />
        </svg>
      </div>

      <div className={styles.location}>
        <svg className={styles.locationIcon}>
          <use xlinkHref={`${icons}#icon-flash`} />
        </svg>
        <button type="button" className={styles.btn}>Belo Horizonte, MG - Brazil</button>
      </div>

      <div className={styles.rating}>
        <div className={styles.ratingAverage}>PRO</div>
        <div className={styles.ratingCount}>Player</div>
      </div>
    </div>

    <div className={styles.detail}>
      TEST
    </div>

    <div className={styles.cta}>
      <h2 className={styles.ctaBookNow}>
        TWITCH.TV - LIVE CHANNEL
      </h2>

      <iframe
        title="twitch"
        src={`https://player.twitch.tv/?channel=disguisedtoast&parent=${window.location.hostname}&muted=true`}
        height="300"
        width="400"
        frameBorder="1"
        scrolling="no"
        allowFullScreen={false}
      />
    </div>

  </>
);

export default Home;
