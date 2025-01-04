import React, { useState } from 'react';

import LanguageButton from './LanguageButton';
import { useComponentTKey } from '../../utils/i18n';

import { screens } from '../../constants/screens';

const Navbar = (props) => {
  const { currentPage, link } = props;
  const { tKey } = useComponentTKey('navbar');
  const { HOME_PAGE } = screens;
  const [isLoading, setIsLoading] = useState(false);

  const isHomePage = () => {
    return currentPage === HOME_PAGE;
  };

  const getRoute = () => {
    return isHomePage() ? '' : '/';
  };

  const handleButButton = () => {
    setIsLoading(true);
    window.location = link;
  };

  return (
    <div id="sticky-wrapper" className="sticky-wrapper" style={{ height: 62 }}>
      <nav className="navbar navbar-expand-lg" id="navbar">
        <div className="container">
          <a className="navbar-brand" href={isHomePage() ? '#' : '/'}>
            <img src="/images/logos/white-logo.png" width={120} className="img-fluid" />
          </a>

          <LanguageButton className="btn custom-language-btn d-lg-none ms-auto me-4" />

          {isHomePage() && (
            <button className="btn custom-btn d-lg-none ms-auto me-4" onClick={handleButButton}>
              {tKey('buy_ticket')}
            </button>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
              <li className="nav-item">
                <a
                  className="nav-link click-scroll"
                  href={`${getRoute()}${isHomePage() ? '#section_1' : ''}`}
                >
                  {tKey('home')}
                </a>
              </li>

              <li className={`nav-item ${!isHomePage() ? 'd-none' : ''}`}>
                <a className="nav-link click-scroll" href={`${getRoute()}#section_2`}>
                  {tKey('about')}
                </a>
              </li>

              <li className={`nav-item ${!isHomePage() ? 'd-none' : ''}`}>
                <a className="nav-link click-scroll" href={`${getRoute()}#section_3`}>
                  {tKey('artists')}
                </a>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link click-scroll" href="#section_4">
                  {tKey("schedule")}
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link click-scroll" href="#section_5">
                  {tKey("pricing")}
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link click-scroll" href="#section_6">
                  {tKey("contact")}
                </a>
              </li> */}
            </ul>

            <LanguageButton className="btn custom-language-btn d-lg-block d-none" />

            {isHomePage() && (
              <button className="btn custom-btn d-lg-block d-none" onClick={handleButButton}>
                {isLoading ? <div className="purchase__spinner"></div> : tKey('buy_ticket')}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
