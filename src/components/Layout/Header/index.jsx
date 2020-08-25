import React from 'react';

import styles from './style.scss';

const Header = () => (
  <header className={styles.header}>
    <div>GamersX {/* <Logo /> */}</div>
    <div>Search (form) {/* <Search /> */}</div>
    <div>User (div = ImgAvatar + NicknameSpan) {/* <User /> */}</div>
  </header>
);

export default Header;
