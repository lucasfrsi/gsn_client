/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { increaseCountAction, decreaseCountAction, resetCountAction } from '../../store/actions/counter';

import styles from './style.scss';

const CounterFooter = ({ counter, increaseCount, decreaseCount, resetCount }) => (
  <footer className={styles.footer}>
    <p>Build #{__webpack_hash__}</p>
    <button className={[styles.button, styles.subtract].join(' ')} type="button" onClick={() => decreaseCount()}>-</button>
    <span className={styles.span} onClick={() => resetCount()}>{counter}</span>
    <button className={[styles.button, styles.add].join(' ')} type="button" onClick={() => increaseCount()}>+</button>
    <p>Click the count to reset it!</p>
  </footer>
);

CounterFooter.propTypes = {
  counter: PropTypes.number.isRequired,
  increaseCount: PropTypes.func.isRequired,
  decreaseCount: PropTypes.func.isRequired,
  resetCount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  increaseCount: () => dispatch(increaseCountAction()),
  decreaseCount: () => dispatch(decreaseCountAction()),
  resetCount: () => dispatch(resetCountAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterFooter);
