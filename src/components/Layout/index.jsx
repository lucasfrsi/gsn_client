import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <header className={styles.header}>
      Logo
      Search Bar
      User avatar + Name
    </header>
    <div className={styles.content}>
      <nav className={styles.sidebar}>
        Side navigation bar (items)
        Copyright
      </nav>
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
