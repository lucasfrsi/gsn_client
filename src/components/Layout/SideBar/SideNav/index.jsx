import React from 'react';

import SideNavItem from '../SideNavItem';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

const SideNav = () => (
  <ul className={styles.sideNav}>
    <SideNavItem
      item="Home"
      route="/"
      svgPath={`${icons}#icon-home`}
    />
    <SideNavItem
      item="Profile"
      route="/test"
      svgPath={`${icons}#icon-home`}
    />
    <SideNavItem
      item="Logout"
      route="/test2"
      svgPath={`${icons}#icon-home`}
    />
  </ul>
);

export default SideNav;
