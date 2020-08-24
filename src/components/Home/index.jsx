import React from 'react';

import styles from './style.scss';
import reactlogo from '../../assets/react-logo.svg';

const Home = () => (
  <div className={styles.home}>
    <h1>REACT BOILERPLATE</h1>
    <img src={reactlogo} alt="react logo" />
  </div>
);

export default Home;
