import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeAvatarRequest, changeCoverRequest } from '../../store/actions/users';

import Backdrop from '../UI/Backdrop';
import svg from '../../assets/svg/sprite.svg';

import styles from './style.scss';

const ChangeAvatarOrCover = ({ changeAvatar, changeCover, isAvatar, closeModal }) => {
  const [file, setFile] = useState({
    value: null,
    isValid: false,
  });

  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file.value) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file.value);
  }, [file.value]);

  const pickedHandler = (event) => {
    let pickedFile;
    const fileRegex = /\.(jpg|jpeg|png|bmp)$/i;
    if (event.target.files && event.target.files.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      pickedFile = event.target.files[0];
      if (pickedFile.name.match(fileRegex)) {
        setFile({
          value: pickedFile,
          isValid: true,
        });
      }
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const imageSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file.value);

    if (isAvatar) {
      changeAvatar(formData);
    } else {
      changeCover(formData);
    }

    setFile({
      value: null,
      isValid: false,
    });
    setPreviewUrl(null);
    closeModal();
  };

  return (
    <>
      <Backdrop onClick={() => closeModal()} local />
      <div className={styles.changeImage}>
        {/* <svg className={styles.closeModal} onClick={() => closeModal()}>
          <use xlinkHref={`${svg}#icon-cross`} />
        </svg> */}
        <form className={styles.form} onSubmit={imageSubmitHandler}>
          <div className={styles.imageDiv}>
            <label htmlFor="image">
              <strong>{isAvatar ? 'Update Profile Picture' : 'Update Cover Picture'}</strong>
              <input
                id="image"
                name="image"
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg,.bmp"
                onChange={pickedHandler}
              />
            </label>
            <div className={styles.imageUpload}>
              <div className={`${styles.imageUploadPreview} ${!isAvatar && styles.cover}`}>
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                <button className={styles.pickAnImage} type="button" onClick={pickImageHandler}>
                  Choose File
                </button>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancelButton} type="submit" onClick={() => closeModal()}>Cancel</button>
            <button disabled={!file.isValid} className={styles.submitButton} type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

ChangeAvatarOrCover.propTypes = {
  changeAvatar: PropTypes.func.isRequired,
  changeCover: PropTypes.func.isRequired,
  isAvatar: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(null, {
  changeAvatar: changeAvatarRequest,
  changeCover: changeCoverRequest,
})(ChangeAvatarOrCover);
