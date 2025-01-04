import React, { useRef } from 'react';

import { useComponentTKey } from '../../../utils/i18n';

const ArtistSection = () => {
  const { tKey } = useComponentTKey('artist_section');

  return (
    <section className="artists-section section-padding" id="section_3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h2 className="mb-4">{tKey('title')}</h2>
          </div>

          <div className="col-lg-5 col-12">
            <div className="artists-thumb">
              <div className="artists-image-wrap">
                <img src="/app-assets/events/pk-2.jpg" className="artists-image img-fluid" />
              </div>

              <div className="artists-hover">
                <p>
                  <strong>{tKey('name')}:</strong>
                  <strong>Madona</strong>
                </p>

                <hr />

                <p className="mb-0">
                  <strong>{tKey('date')}:</strong>
                  <strong>25 de Marzo</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-12">
            <div className="artists-thumb">
              <div className="artists-image-wrap">
                <img src="/app-assets/events/reina.jpg" className="artists-image img-fluid" />
              </div>

              <div className="artists-hover">
                <p>
                  <strong>{tKey('name')}:</strong>
                  <strong>After Reina</strong>
                </p>

                <hr />

                <p className="mb-0">
                  <strong>{tKey('date')}:</strong>
                  <strong>17 de Marzo</strong>
                </p>
              </div>
            </div>

            <div className="artists-thumb">
              <img src="/app-assets/events/ey-mor.jpg" className="artists-image img-fluid" />

              <div className="artists-hover">
                <p>
                  <strong>{tKey('name')}:</strong>
                  <strong>EY-MOR</strong>
                </p>

                <hr />

                <p className="mb-0">
                  <strong>{tKey('date')}:</strong>
                  <strong>18 de Marzo</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
