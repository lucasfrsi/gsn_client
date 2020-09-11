import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUserRequest, searchUserClear, searchUserCancel } from '../../../../store/actions/search';

import ResultItem from './ResultItem';

import icons from '../../../../assets/svg/sprite.svg';
import styles from './style.scss';

const Search = ({ isAuthenticated, searchUser, result, clearResult, cancelSearch }) => {
  const [query, setQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [resultFocused, setResultFocused] = useState(false);

  const formRef = useRef(null);
  useEffect(() => {
    function handleClickOutsideForm(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setInputFocused(false);
        setResultFocused(false);
      }
    }

    document.addEventListener('click', handleClickOutsideForm);

    return () => {
      document.removeEventListener('click', handleClickOutsideForm);
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      setInputFocused(true);
      searchUser(trimmedQuery);
    }

    if (trimmedQuery.length === 0) {
      cancelSearch();
      clearResult();
      setInputFocused(false);
      setResultFocused(false);
    }
  }, [cancelSearch, clearResult, query, searchUser]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onClickHandler = () => {
    clearResult();
    setQuery('');
    setInputFocused(false);
    setResultFocused(false);
  };

  const onKeyDownHandler = (event) => {
    const input = document.getElementById('searchInput');
    const ul = document.getElementById('searchResults');

    if (event.target === input) {
      if (ul && event.key === 'ArrowUp') {
        event.preventDefault();
        ul.lastChild.firstChild.focus();
      }
      if (ul && event.key === 'ArrowDown') {
        event.preventDefault();
        ul.firstChild.firstChild.focus();
      }
      if (event.key === 'Escape') {
        input.blur();
        setInputFocused(false);
        setResultFocused(false);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const firstOfList = ul.firstChild;
      if (event.target.closest('li') === firstOfList) {
        input.focus();
      } else {
        event.target.closest('li').previousSibling.firstChild.focus();
      }
    } else if (event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault();
      const lastOfList = ul.lastChild;
      if (event.target.closest('li') === lastOfList) {
        input.focus();
      } else {
        event.target.closest('li').nextSibling.firstChild.focus();
      }
    } else if (event.key === 'Escape') {
      setInputFocused(false);
      setResultFocused(false);
    }
  };

  const checkShowResults = () => inputFocused || resultFocused;

  return isAuthenticated && (
  <>
    <form ref={formRef} className={styles.searchForm} onSubmit={(e) => onSubmitHandler(e)}>
      <div className={styles.inputBox}>
        <input
          id="searchInput"
          type="text"
          className={styles.input}
          placeholder="Search profiles"
          autoComplete="off"
          value={query}
          onChange={(e) => onChangeHandler(e)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => { setInputFocused(false); })}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
        <svg className={styles.icon}>
          <use xlinkHref={`${icons}#icon-magnifying-glass`} />
        </svg>
      </div>
      <div className={styles.resultBox}>
        {result.length > 0 && checkShowResults() && (
          <ul id="searchResults" className={styles.resultList}>
            {result.map((user) => (
              <ResultItem
                key={user._id}
                id={user._id}
                avatar={user.avatar}
                nickname={user.nickname}
                realName={user.profile && user.profile.personalData.realName}
                onFocus={() => setResultFocused(true)}
                onClick={() => onClickHandler()}
                onKeyDown={(e) => onKeyDownHandler(e)}
                queryString={query}
              />
            ))}
          </ul>
        )}
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
