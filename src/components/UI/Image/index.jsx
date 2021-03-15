import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../LoadingSpinner';
import defaultMomentImage from '../../../assets/images/default_momentImage.png';

const Image = ({ image, customStyle, spinnerSize, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleOnError = (event) => {
    setLoading(false);
    const img = event.target;
    img.src = defaultMomentImage;
  };

  return (
    <>
      {loading ? <LoadingSpinner size={spinnerSize} /> : null}
      <img
        src={`http://localhost:5000/${image}`}
        alt={alt}
        className={customStyle}
        onLoad={handleOnLoad}
        onError={handleOnError}
        style={{
          display: loading ? 'none' : 'inline-block',
        }}
      />
    </>
  );
};

Image.propTypes = {
  image: PropTypes.string.isRequired,
  customStyle: PropTypes.string.isRequired,
  spinnerSize: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Image.defaultProps = {
  alt: 'image',
};

export default Image;
