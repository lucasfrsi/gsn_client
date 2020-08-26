import React from 'react';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

const Search = () => (
  <form action="#" className={styles.search}>
    <input type="text" className={styles.input} placeholder="Search profiles" />
    <button type="button" className={styles.button}>
      <svg className={styles.icon}>
        <use xlinkHref={`${icons}#icon-magnifying-glass`} />
      </svg>
    </button>
  </form>
);

export default Search;
