import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useComponentTKey } from '../../../utils/i18n';

import DefaultModal from '../../modals/DefaultModal';

const TermsAndConditions = (props) => {
  const { tKey } = useComponentTKey('termsAndConditions');
  const [showModal, setShowModal] = useState(false);
  const checkboxRef = useRef(null);

  const { onChange } = props;

  useLayoutEffect(() => {
    checkboxRef.current.checked = false;
  }, []);

  useEffect(() => {
    checkboxRef.current.checked = false;
  }, []);

  const handleCheckBox = () => {
    onChange(checkboxRef.current.checked);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="terms-container text-center">
      <div className="terms-checkbox">
        <input type="checkbox" ref={checkboxRef} onChange={handleCheckBox} id="terms-checkbox" />
        <label htmlFor="terms-checkbox">&nbsp;{tKey('agreement')}</label>
      </div>
      <div className="terms-link">
        <a href="#" onClick={handleShowModal}>
          {tKey('viewTerms')}
        </a>
      </div>
      {showModal && (
        <DefaultModal
          handleCloseModal={handleCloseModal}
          title={tKey('termsAndConditions')}
          text1={tKey('term-1')}
          text2={tKey('user-responsability-1')}
        />
      )}
    </div>
  );
};

export default TermsAndConditions;
