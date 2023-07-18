import React from 'react';

const ImagePreviewModal = ({ image, onClose }) => {
  return (
    <div className="image-modal">
      <div className="image-modal-content">
        <img src={image} alt="Preview" />
      </div>
    </div>
  );
};

export default ImagePreviewModal;