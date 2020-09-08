import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

const Search = ({ isAuthenticated }) => isAuthenticated && (
  <form action="#" className={styles.search}>
    <input type="text" className={styles.input} placeholder="Search profiles" />
    <button type="button" className={styles.button}>
      <svg className={styles.icon}>
        <use xlinkHref={`${icons}#icon-magnifying-glass`} />
      </svg>
    </button>
  </form>
);

Search.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Search);
// prevent default on ENTER key press
// because a search users page wont be implemented
