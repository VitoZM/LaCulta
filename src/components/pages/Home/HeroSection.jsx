import React from 'react';

import { useComponentTKey } from '../../../utils/i18n';
import { getLiteralDate } from '../../../utils/date.utils';

const HeroSection = ({ event }) => {
  const { tKey } = useComponentTKey('hero_section');
  const { link, title, startDate } = event || {};

  const handleBuyButton = () => {
    window.location.href = link;
  };

  return (
    <section className="hero-section" id="section_1">
      <div className="section-overlay"></div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-12 mt-auto mb-5 text-center">
            <small>{tKey('presents')}</small>

            <h1 className="text-white mb-5">{title}</h1>

            <button className="btn custom-btn smoothscroll" onClick={handleBuyButton}>
              {tKey('buy_ticket')}
            </button>
          </div>

          <div className="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center">
            <div className="date-wrap">
              <h5 className="text-white">
                <i className="custom-icon bi-clock me-2"></i>
                {getLiteralDate(startDate)}
              </h5>
            </div>

            <div className="location-wrap mx-auto py-3 py-lg-0">
              <h5 className="text-white">
                <i className="custom-icon bi-geo-alt me-2"></i>
                {tKey('location')}
              </h5>
            </div>

            <div className="social-share">
              <ul className="social-icon d-flex align-items-center justify-content-center">
                <span className="text-white me-3">{tKey('share')}:</span>

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
                  <a
                    href="https://www.instagram.com/la_culta/"
                    className="social-icon-link"
                    target="_blank"
                  >
                    <span className="bi-instagram"></span>
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
      <div>
        <img src="images/happy-people.jpg" className="custom-slider" />
      </div>
    </section>
  );
};

export default HeroSection;
