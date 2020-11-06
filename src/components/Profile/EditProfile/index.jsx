import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProfileRequest } from '../../../store/actions/users';

import Backdrop from '../../UI/Backdrop';

import styles from './style.scss';

const EditProfile = ({ close, updateProfile }) => {
  const [profile, setProfile] = useState({

  });

  return (
    <>
      <Backdrop onClick={() => close()} local />
      <div>
        EDIT PROFILE
      </div>
    </>
  );
};

EditProfile.propTypes = {
  close: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps, {
  updateProfile: updateProfileRequest,
})(EditProfile);
