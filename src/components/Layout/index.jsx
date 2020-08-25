import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import SideBar from './SideBar';

import styles from './style.scss';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <SideBar />
      <main className={styles.pages}>
        {children}
      </main>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
