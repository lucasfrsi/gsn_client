import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUserRequest, searchUserClear, searchUserCancel } from '../../../../store/actions/search';

import ResultItem from './ResultItem';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

function useOutsideAlerter(ref, func1, func2) { // UNDERSTAND CODE COMPLETELY
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        func1();
        func2();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, func1, func2]);
}

const Search = ({ isAuthenticated, searchUser, result, clearResult, cancelSearch }) => {
  const [showResults, setShowResults] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const inputFocusedRef = useRef(inputFocused);
  inputFocusedRef.current = inputFocused;

  const inputValue = document.querySelector(`.${styles.input}`);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setInputFocused, setShowResults);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onBlurHandler = (event) => {
    const ul = document.getElementById('results');
    const lastSearchResult = ul.lastChild ? ul.lastChild.firstChild : null;
    if (event.target === lastSearchResult) {
      ul.firstChild.firstChild.focus();
    }
    setTimeout(() => {
      if (inputFocusedRef.current === false) setShowResults(false);
    });
  };

  const onChangeHandler = (event) => {
    const query = event.target.value.trim();

    if (query) {
      searchUser(query);
      setShowResults(true);
    }

    if (event.target.value.length === 0) {
      cancelSearch();
      clearResult();
      setShowResults(false);
      setInputFocused(false);
    }
  };

  return isAuthenticated && (
  <>
    <form ref={wrapperRef} className={styles.searchForm} onSubmit={(e) => onSubmitHandler(e)}>
      <div className={styles.inputBox}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search profiles"
          onChange={(e) => onChangeHandler(e)}
          onFocus={() => setShowResults(true)}
          onBlur={(e) => onBlurHandler(e)}
        />
        <svg className={styles.icon}>
          <use xlinkHref={`${icons}#icon-magnifying-glass`} />
        </svg>
      </div>
      <div className={styles.resultBox}>
        <ul id="results" className={styles.resultList}>
          {result.length > 0 && showResults ? result.map((user) => (
            <ResultItem
              key={user._id}
              id={user._id}
              avatar={user.avatar}
              nickname={user.nickname}
              realName={user.profile && user.profile.personalData.realName}
              onFocus={() => setInputFocused(true)}
              onBlur={(e) => onBlurHandler(e)}
              onClick={() => {
                setShowResults(false);
                setInputFocused(false);
                inputValue.value = ''; // change input value to state, shows last search
              }}
            />
          )) : null}
        </ul>
      </div>
    </form>
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
      profile: PropTypes.shape({
        personalData: PropTypes.shape({
          realName: PropTypes.string,
        }),
      }),
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
