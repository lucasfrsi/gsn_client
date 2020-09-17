import React from 'react';

import loadingGif from '../../../assets/images/loading.gif';

import styles from './style.scss';

const Loading = () => (
  <div className={styles.loading}>
    <img src={loadingGif} alt="loading gif" />
  </div>
);

export default Loading;
