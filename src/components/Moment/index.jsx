import React from 'react';

import image from '../../assets/images/avatar2.jpg';
import nani from '../../assets/images/reactions/nani.png';
import love from '../../assets/images/reactions/love.png';
import haha from '../../assets/images/reactions/haha.png';
import like from '../../assets/images/reactions/like.png';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const Moment = () => (
  <div className={styles.moment}>
    <div className={styles.momentHeading}>
      <p className={styles.momentTitle}>This is a moment title</p>
      <svg className={styles.momentPhotoButton}>
        <use xlinkHref={`${svg}#icon-image`} />
      </svg>
    </div>
    <div className={styles.momentText}>
      One morning, when Gregor Samsa woke from troubled dreams,
      he found himself transformed in his bed into a horrible vermin. He lay on his armour-like b.
    </div>
    <div className={styles.reactToMoment}>
      <img src={like} alt="Like" />
    </div>
    <div className={styles.momentData}>
      <div className={styles.momentReactionsBox}>
        <div className={styles.momentReactions}>
          <img src={nani} alt="Nani" className={styles.reactionImg} />
          <img src={love} alt="Love" className={styles.reactionImg} />
          <img src={haha} alt="Haha" className={styles.reactionImg} />
        </div>
        <div className={styles.reactionCount}><span>67</span> Reactions</div>
      </div>
      <div className={styles.momentUserBox}>
        <p className={styles.momentUserName}>xCloudFFVII</p>
        <p className={styles.momentUserDate}>Aug 26<sup>th</sup>, 2020</p>
      </div>
      <img src={image} alt="User 1" className={styles.momentUserPhoto} />
    </div>
  </div>
);

export default Moment;
