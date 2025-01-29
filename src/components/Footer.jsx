import React from 'react';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('global');

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="text-white mb-lg-0">{t('header')}</h2>
            </div>

            <div className="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
              <ul className="social-icon d-flex justify-content-lg-end">
                <li className="social-icon-item">
                  <a
                    href="https://www.instagram.com/la_culta/"
                    className="social-icon-link"
                    target="_blank"
                  >
                    <span className="bi-instagram"></span>
                  </a>
                </li>

                <li className="social-icon-item">
                  <a
                    href="https://www.facebook.com/share/15ZW2mPaTH/"
                    className="social-icon-link"
                    target="_blank"
                  >
                    <span className="bi-facebook"></span>
                  </a>
                </li>

                <li className="social-icon-item">
                  <a href="https://wa.me/59173411989" className="social-icon-link" target="_blank">
                    <span className="bi-whatsapp"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mb-4 pb-2">
            <h5 className="site-footer-title mb-3">Links</h5>

            <ul className="site-footer-links">
              <li className="site-footer-link-item">
                <a href="/" className="site-footer-link">
                  Home
                </a>
              </li>

              {/* <li className="site-footer-link-item">
                <a href="https://lacultasucre.com/hostel" className="site-footer-link">
                  Hostal
                </a>
              </li>

              <li className="site-footer-link-item">
                <a href="https://lacultasucre.com/restaurant" className="site-footer-link">
                  Restaurante
                </a>
              </li> */}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <h5 className="site-footer-title mb-3">Have a question?</h5>

            <p className="text-white d-flex mb-1">
              <a href="https://wa.me/59173411989" className="site-footer-link">
                73411989
              </a>
            </p>

            <p className="text-white d-flex">
              <a href="mailto:osmarriosmontoya@gmail.com" className="site-footer-link">
                osmarriosmontoya@gmail.com
              </a>
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
            <h5 className="site-footer-title mb-3">Location</h5>

            <p className="text-white d-flex mt-3 mb-2">Beni #31, breve indicación</p>

            <a
              className="link-fx-1 color-contrast-higher mt-3"
              href="https://maps.app.goo.gl/z9M43RfmjUS2ch1g9"
              target="_blank"
            >
              <span>Ubicación en mapa</span>
              <svg className="icon" viewBox="0 0 32 32" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="16" cy="16" r="15.5"></circle>
                  <line x1="10" y1="18" x2="16" y2="12"></line>
                  <line x1="16" y1="12" x2="22" y2="18"></line>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 mt-5">
              <p className="copyright-text">Copyright © 2025 La Culta</p>
              <p className="copyright-text">
                Powered by:{' '}
                <a href="https://wa.me/59160313229" target="_blank">
                  Alvaro Zapata{'  '}
                  <img src="/images/logos/devop-icon.png" alt="Alvaro Zapata" height={25} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
