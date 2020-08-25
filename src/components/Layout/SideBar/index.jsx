import React from 'react';

import styles from './style.scss';

const SideBar = () => (
  <nav className={styles.sidebar}>
    <div>Side navigation bar (items) {/* <SideNavBar /> */}</div>
    <div>Copyright {new Date().getFullYear()}</div>
  </nav>
);

export default SideBar;
