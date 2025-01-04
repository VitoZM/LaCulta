import React from 'react';

import { tabs } from '../../../constants/tabs';

import { getLiteralDate } from '../../../utils/date.utils';
import { useComponentTKey } from '../../../utils/i18n';

const PurchaseHeader = (props) => {
  const { SELECTION, PAYMENT, RESUME } = tabs;
  const { tab, iframe, title, startDate } = props;
  const { tKey } = useComponentTKey('tabs');

  const getIFrameSource = (iframe) => {
    const src = iframe?.split('src="')?.[1]?.split('"')?.[0]?.split('show_text=');
    return `${src?.[0]}show_text=false&width=500`;
  };

  return (
    <div>
      <div className="custom-form ticket-form d-flex flex-column justify-content-center p-3 flex-wrap">
        <div
          className="mx-auto"
          style={{
            position: 'relative',
            width: '100%',
            height: '65vw',
            maxHeight: '420px',
            maxWidth: '500px',
            boxShadow: '1px 1px 10px 0px #C50005',
          }}
        >
          <img
            className="position-absolute top-50 start-50 translate-middle img-fluid"
            src="/images/loader.gif"
            style={{ position: 'absolute', height: '100%', border: 'none', left: '20%' }}
          />
          {iframe && (
            <iframe
              src={getIFrameSource(iframe)}
              style={{ position: 'absolute', width: '100%', height: '100%', border: 'none' }}
            ></iframe>
          )}
        </div>
        <div className="mx-auto mt-3 text-center">
          <h3>{title}</h3>
          <b style={{ color: '#C50005' }}>{getLiteralDate(startDate, '')}</b>
        </div>
      </div>
      <div className="custom-form ticket-form mb-1 p-0">
        <div className="wrapper">
          <div className="tabs_wrap">
            <ul>
              <li data-tabs="selection" className={tab === SELECTION ? 'active' : ''}>
                {tKey('selection')}
              </li>
              <li data-tabs="payment" className={tab === PAYMENT ? 'active' : ''}>
                {tKey('payment')}
              </li>
              <li data-tabs="resume" className={tab === RESUME ? 'active' : ''}>
                {tKey('resume')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
