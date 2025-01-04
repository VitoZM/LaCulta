import React from 'react';
import './modals.css';

const DefaultModal = (props) => {
  const {
    handleCloseModal,
    title,
    imageAlt,
    imageSrc,
    imageStyle,
    text1,
    text2,
    CustomButton,
    DownloadButton,
    closeButtonDisabled,
  } = props;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-danger px-2 py-1 modal-close"
          disabled={closeButtonDisabled}
          onClick={handleCloseModal}
        >
          X
        </button>
        <h3 className="mb-0">{title}</h3>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="img-fluid mx-auto d-block"
          style={imageStyle}
        />
        <p className={`${DownloadButton && 'mb-0'}`}>{text1}</p>
        {DownloadButton ? <DownloadButton /> : null}
        <b>{text2}</b>
        {CustomButton ? <CustomButton /> : null}
      </div>
    </div>
  );
};

export default DefaultModal;
