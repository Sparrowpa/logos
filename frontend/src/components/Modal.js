import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Full View" className="modal-image" />
        <button onClick={onClose} className="modal-close-button">×</button>
      </div>
    </div>
  );
};

export default Modal;
