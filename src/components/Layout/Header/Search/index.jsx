import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUserRequest, searchUserClear, searchUserCancel } from '../../../../store/actions/search';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

const Search = ({ isAuthenticated, searchUser, result, clearResult, cancelSearch }) => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    const query = event.target.value.trim();
    if (query) searchUser(query);
    if (event.target.value.length === 0) {
      cancelSearch();
      clearResult();
    }
  };

  return isAuthenticated && (
  <>
    <form className={styles.search} onSubmit={(e) => onSubmitHandler(e)}>
      <input type="text" className={styles.input} placeholder="Search profiles" onChange={(e) => onChangeHandler(e)} />
      <button type="button" className={styles.button}>
        <svg className={styles.icon}>
          <use xlinkHref={`${icons}#icon-magnifying-glass`} />
        </svg>
      </button>
    </form>
    {result.length > 0 ? result.map((user) => <div key={user._id}>{user.nickname} {user.avatar}</div>) : <p>No results</p>}
  </>
  );
};

Search.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  searchUser: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  result: state.search.result,
});

export default connect(mapStateToProps, {
  searchUser: searchUserRequest,
  clearResult: searchUserClear,
  cancelSearch: searchUserCancel,
})(Search);
