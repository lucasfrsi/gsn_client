import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { removeAlert } from '../../../store/actions/alert';

const Alert = ({ alertStyle }) => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => function cleanup() {
    const reset = () => dispatch(removeAlert());
    reset();
  }, [dispatch]);

  return (
    alert.data !== null && (
    <div className={alertStyle}>
      {alert.data.message}
    </div>
    )
  );
};

Alert.propTypes = {
  alertStyle: PropTypes.string.isRequired,
};

export default Alert;
