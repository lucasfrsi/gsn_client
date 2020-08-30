import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './style.scss';

const SideNavItem = ({ item, svgPath, route, exact }) => (
  <li className={styles.sideNavItem}>
    <NavLink to={route} activeClassName={styles.selected} exact={exact}>
      <svg>
        <use xlinkHref={svgPath} />
      </svg>
      <span>{item}</span>
    </NavLink>
  </li>
);

SideNavItem.propTypes = {
  item: PropTypes.string.isRequired,
  svgPath: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

SideNavItem.defaultProps = {
  exact: false,
};

export default SideNavItem;
