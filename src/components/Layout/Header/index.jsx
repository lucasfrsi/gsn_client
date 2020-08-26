import React from 'react';

import Logo from './Logo';
import Search from './Search';
import User from './User';

import styles from './style.scss';

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <Search />
    <User />
  </header>
);

export default Header;
