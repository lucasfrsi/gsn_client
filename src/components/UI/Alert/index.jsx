import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeAlert } from '../../../store/actions/alert';

const Alert = ({ alert, alertStyle, reset }) => {
  useEffect(() => function cleanup() {
    reset();
  }, [reset]);

  return (
    alert.data !== null && (
    <div className={alertStyle}>
      {alert.data.message}
    </div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    data: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  }).isRequired,
  alertStyle: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { reset: removeAlert })(Alert);
