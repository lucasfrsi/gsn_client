import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    {/* <NavBar /> */}
    {children}
    {/* <Footer /> */}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
