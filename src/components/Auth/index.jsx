import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginRequest, signupRequest } from '../../store/actions/auth';
import { removeAlert } from '../../store/actions/alert';
import Alert from '../UI/Alert';

import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const Auth = ({ isAuthLogin, close }) => {
  const dispatch = useDispatch();
  const login = (e, p) => dispatch(loginRequest(e, p));
  const signup = (n, e, p) => dispatch(signupRequest(n, e, p));
  const clearError = () => dispatch(removeAlert());

  const [isFormValid, setIsFormValid] = useState(false);

  const [nickname, setNickname] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });

  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });

  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });

  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });

  const [isLogin, setIsLogin] = useState(isAuthLogin);

  const onChangeHandler = (event) => {
    const nicknameRegex = /^[a-zA-Z0-9]+( ?[a-zA-Z0-9]+)*$/;
    const emailRegex = /\S+@\S+\.\S+/;

    switch (event.target.name) {
      case 'nickname':
        setNickname({
          ...nickname,
          value: event.target.value,
          isValid: nicknameRegex.test(event.target.value) && event.target.value.length < 25,
          isTouched: true,
        });
        break;
      case 'email':
        setEmail({
          ...email,
          value: event.target.value,
          isValid: emailRegex.test(event.target.value),
          isTouched: true,
        });
        break;
      case 'password':
        setPassword({
          ...password,
          value: event.target.value,
          isValid: event.target.value.length > 7,
          isTouched: true,
        });
        if (event.target.value !== confirmPassword.value) setConfirmPassword((prevState) => ({ ...prevState, isValid: false }));
        if (event.target.value === confirmPassword.value && confirmPassword.isTouched && confirmPassword.value.length > 0) setConfirmPassword((prevState) => ({ ...prevState, isValid: true }));
        break;
      case 'confirmPassword':
        setConfirmPassword({
          ...confirmPassword,
          value: event.target.value,
          isValid: event.target.value === password.value && event.target.value !== '',
          isTouched: true,
        });
        break;
      default:
        break;
    }
  };

  const onBlurHandler = (event) => {
    switch (event.target.name) {
      case 'nickname':
        setNickname({ ...nickname, isTouched: true });
        break;
      case 'email':
        setEmail({ ...email, isTouched: true });
        break;
      case 'password':
        setPassword({ ...password, isTouched: true });
        break;
      case 'confirmPassword':
        setConfirmPassword({ ...confirmPassword, isTouched: true });
        break;
      default:
        break;
    }
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    if (isLogin) login(email.value, password.value);
    if (!isLogin) signup(nickname.value, email.value, password.value);
  };

  const toggleLogin = (event) => {
    setNickname({
      value: '',
      isValid: false,
      isTouched: false,
    });
    setEmail({
      value: '',
      isValid: false,
      isTouched: false,
    });
    setPassword({
      value: '',
      isValid: false,
      isTouched: false,
    });
    setConfirmPassword({
      value: '',
      isValid: false,
      isTouched: false,
    });
    clearError();
    setIsLogin((prevState) => !prevState);
    event.target.blur();
  };

  useEffect(() => {
    if (
      (isLogin && email.isValid && password.isValid)
      || (!isLogin && nickname.isValid && email.isValid && password.isValid && confirmPassword.isValid)
    ) {
      return setIsFormValid(true);
    }
    return setIsFormValid(false);
  }, [nickname, email, password, confirmPassword, isLogin]);

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
        <Alert alertStyle={styles.errorMessage} />
        <form className={styles.form} onSubmit={authSubmitHandler}>

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
                    value={nickname.value}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    className={`${styles.inputGroupInput} ${!nickname.isValid && nickname.isTouched ? styles.invalidInput : nickname.isValid && styles.validInput}`}
                  />
                  <label htmlFor="nickname" className={styles.inputGroupLabel}>Nickname:</label>
                </div>
              </div>
            )}
          {/* Nicknames must be between 1 and 24 characters. */}
          {/* Nicknames must only contain alphanumeric characters and , if needed, a space in between. */}

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
                value={email.value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`${styles.inputGroupInput} ${!email.isValid && email.isTouched ? styles.invalidInput : email.isValid && styles.validInput}`}
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
                value={password.value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`${styles.inputGroupInput} ${!password.isValid && password.isTouched ? styles.invalidInput : password.isValid && styles.validInput}`}
              />
              <label htmlFor="password" className={styles.inputGroupLabel}>Password:</label>
            </div>
          </div>
          {/* Passwords must have a minimum length of 8 characters. */}

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
                    value={confirmPassword.value}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    className={`${styles.inputGroupInput} ${!confirmPassword.isValid && confirmPassword.isTouched ? styles.invalidInput : confirmPassword.isValid && styles.validInput}`}
                  />
                  <label htmlFor="confirmPassword" className={styles.inputGroupLabel}>Confirm Password:</label>
                </div>
              </div>
            )}
          {/* Passwords do not match. Please try again. */}

          <button type="submit" disabled={!isFormValid} className={styles.formButton}>{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>

        <div className={styles.authToggle}>
          <span className={styles.authToggleText}>
            {isLogin ? "Don't have an account? " : 'Already registered? '}
          </span>
          <span role="button" tabIndex="0" onKeyDown={() => {}} className={styles.authToggleButton} onClick={(e) => toggleLogin(e)}>
            {isLogin ? 'Sign Up!' : 'Log In!'}
          </span>
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
