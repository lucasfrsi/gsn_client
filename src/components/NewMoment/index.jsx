import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createMomentRequest } from '../../store/actions/moments';

import styles from './style.scss';

const NewMoment = () => {
  const dispatch = useDispatch();
  const createMoment = (f) => dispatch(createMomentRequest(f));

  const [isFormValid, setIsFormValid] = useState(false);

  const [title, setTitle] = useState({
    value: '',
    isValid: false,
  });

  const [text, setText] = useState({
    value: '',
    isValid: false,
  });

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

  useEffect(() => {
    if (title.isValid && text.isValid && file.isValid) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [title.isValid, text.isValid, file.isValid]);

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

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case 'title':
        setTitle({
          ...title,
          value: event.target.value,
          isValid: event.target.value.length > 0 && event.target.value.length < 51,
        });
        break;
      case 'text':
        setText({
          ...text,
          value: event.target.value,
          isValid: event.target.value.length > 0 && event.target.value.length < 151,
        });
        break;
      default:
        break;
    }
  };

  const momentSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('text', text.value);
    formData.append('image', file.value);
    createMoment(formData);
    setTitle({
      value: '',
      isValid: false,
    });
    setText({
      value: '',
      isValid: false,
    });
    setFile({
      value: null,
      isValid: false,
    });
    setPreviewUrl(null);
  };

  return (
    <div className={styles.createMoment}>
      <div className={styles.saySomething}>
        <h3>Share a moment with other members of the community!</h3>
      </div>
      <form className={styles.form} onSubmit={momentSubmitHandler}>
        <div className={styles.formWrapper}>
          <div className={styles.inputsWrapper}>
            <label htmlFor="title">
              <strong>Title</strong>
              <input
                type="text"
                name="title"
                id="title"
                value={title.value}
                autoComplete="off"
                onChange={(e) => onChangeHandler(e)}
              />
              <span
                className={`${styles.charCounter} ${title.value.length > 50 ? styles.charCounterRed : null}`}
              >{title.value.length}/50
              </span>
            </label>
            <label htmlFor="text">
              <strong>Description</strong>
              <textarea
                name="text"
                id="text"
                value={text.value}
                onChange={(e) => onChangeHandler(e)}
              />
              <span
                className={`${styles.charCounter} ${text.value.length > 150 ? styles.charCounterRed : null}`}
              >{text.value.length}/150
              </span>
            </label>
          </div>
          <div className={styles.imageDiv}>
            <label htmlFor="image">
              <strong>Image</strong>
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
              <div className={styles.imageUploadPreview}>
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                {/* {!previewUrl && <p>Please pick an image.</p>} */}
                <button className={styles.pickAnImage} type="button" onClick={pickImageHandler}>
                  PICK IMAGE
                </button>
              </div>
            </div>
          </div>
        </div>
        <button disabled={!isFormValid} className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewMoment;
