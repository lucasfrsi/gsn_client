import React, { useState } from 'react';
import PropTypes from 'prop-types';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const Auth = ({ isAuthLogin, close }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLogin, setIsLogin] = useState(isAuthLogin);

  const { nickname, email, password, confirmPassword } = formData;

  const toggleLogin = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onChangeHandler = (event) => setFormData({
    ...formData, [event.target.name]: event.target.value,
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // set alert, error
    } else {
      // register or login (action)
    }
  };

  return (
    <>
      <div className={styles.localBackdrop} />
      <div className={styles.auth}>
        <button type="button" className={styles.closeButton} onClick={close}>
          <svg className={styles.closeButtonIcon}>
            <use xlinkHref={`${svg}#icon-cross`} />
          </svg>
        </button>
        <h2 className={styles.heading}>
          {isLogin ? 'Log In to GamersX' : 'Join GamersX today'}
        </h2>
        <div className={styles.line} />
        <form className={styles.form} onSubmit={onSubmitHandler}>

          {isLogin ? null
            : (
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputGroupPrepend}>
                    <svg className={styles.inputGroupIcon}>
                      <use xlinkHref={`${svg}#icon-user`} />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="nickname"
                    placeholder=" "
                    id="nickname"
                    value={nickname}
                    onChange={onChangeHandler}
                    className={styles.inputGroupInput}
                  />
                  <label htmlFor="nickname" className={styles.inputGroupLabel}>Nickname:</label>
                </div>
              </div>
            )}

          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <div className={styles.inputGroupPrepend}>
                <svg className={styles.inputGroupIcon}>
                  <use xlinkHref={`${svg}#icon-mail`} />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder=" "
                id="email"
                value={email}
                onChange={onChangeHandler}
                className={styles.inputGroupInput}
              />
              <label htmlFor="email" className={styles.inputGroupLabel}>Email:</label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <div className={styles.inputGroupPrepend}>
                <svg className={styles.inputGroupIcon}>
                  <use xlinkHref={`${svg}#icon-key`} />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder=" "
                id="password"
                value={password}
                onChange={onChangeHandler}
                className={styles.inputGroupInput}
              />
              <label htmlFor="password" className={styles.inputGroupLabel}>Password:</label>
            </div>
          </div>

          {isLogin ? null
            : (
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputGroupPrepend}>
                    <svg className={styles.inputGroupIcon}>
                      <use xlinkHref={`${svg}#icon-key`} />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder=" "
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangeHandler}
                    className={styles.inputGroupInput}
                  />
                  <label htmlFor="confirmPassword" className={styles.inputGroupLabel}>Confirm Password:</label>
                </div>
              </div>
            )}

          <button type="submit" className={styles.formButton}>{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>

        <div className={styles.authToggle}>
          <span className={styles.authToggleText}>
            {isLogin ? "Don't have an account?" : 'Already registered?'}
          </span>
          <button type="button" className={styles.authToggleButton} onClick={toggleLogin}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </div>
    </>
  );
};

Auth.propTypes = {
  isAuthLogin: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Auth;
