import React from 'react';

import { useComponentTKey } from '../utils/i18n';
import { goToUpcomingEvent } from '../utils/commonEventAPIs';

const Popup = (props) => {
  const { tKey } = useComponentTKey('generalTexts');

  const { closePopup, content, title } = props;
  return (
    <div className="modal-overlay" tabIndex="-1" role="dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              goToUpcomingEvent();
              closePopup();
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              goToUpcomingEvent();
              closePopup();
            }}
          >
            {tKey('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
