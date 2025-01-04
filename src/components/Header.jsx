import React from 'react';

import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('global');

  return (
    <header className="site-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12 d-flex flex-wrap">
            <p className="d-flex me-4 mb-0">
              <strong className="text-white">{t('header')}</strong>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
