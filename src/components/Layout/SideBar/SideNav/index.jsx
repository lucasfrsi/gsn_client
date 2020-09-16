import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SideNavItem from '../SideNavItem';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

const SideNav = ({ isAuthenticated }) => (
  <ul className={styles.sideNav}>
    <SideNavItem
      item="Home"
      route="/"
      svgPath={`${icons}#icon-home`}
      exact
    />
    {isAuthenticated ? (
      <>
        <SideNavItem
          item="Profile"
          route="/my-profile"
          svgPath={`${icons}#icon-user`}
        />
        <SideNavItem
          item="Posts"
          route="/posts/5f4299ea964af30c9427fd1c"
          svgPath={`${icons}#icon-pencil`}
        />
        <SideNavItem
          item="Moments"
          route="/test3"
          svgPath={`${icons}#icon-flash`}
        />
      </>
    ) : null}
  </ul>
);

SideNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SideNav);
