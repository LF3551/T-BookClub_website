// ImagePreviewModal.js
import React from 'react';

const ImagePreviewModal = ({ imageUrl, onClose }) => {
  return (
    <div className="image-modal" onClick={onClose}>
      <img src={imageUrl} alt="Image Preview" style={{ maxWidth: '50%' }}/>

    </div>
  );
};

export default ImagePreviewModal;
