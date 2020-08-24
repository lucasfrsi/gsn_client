import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.scss';

const NavBar = () => (
  <div className={styles.nav}>
    <NavLink exact to="/" className={styles.navlink} activeClassName={styles.active}>Home</NavLink>
    <NavLink to="/posts" className={styles.navlink} activeClassName={styles.active}>Posts</NavLink>
  </div>
);

export default NavBar;
