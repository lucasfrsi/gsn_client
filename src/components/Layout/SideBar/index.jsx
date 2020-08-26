import React from 'react';

import SideNav from './SideNav';

import styles from './style.scss';

const SideBar = () => (
  <nav className={styles.sidebar}>
    <SideNav />
    <div className={styles.logo}>© {new Date().getFullYear()} GamersX, Inc.</div>
  </nav>
);

export default SideBar;
