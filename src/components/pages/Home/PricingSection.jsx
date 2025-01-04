import React from 'react';

const PricingSection = () => {
  return (
    <section className="pricing-section section-padding section-bg" id="section_5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            <h2 className="text-center mb-4">Plans, you' love</h2>
          </div>

          <div className="col-lg-6 col-12">
            <div className="pricing-thumb">
              <div className="d-flex">
                <div>
                  <h3>
                    <small>Early Bird</small> $120
                  </h3>

                  <p>Including good things:</p>
                </div>

                <p className="pricing-tag ms-auto">
                  Save up to <span>50%</span>
                </p>
              </div>

              <ul className="pricing-list mt-3">
                <li className="pricing-list-item">platform for potential customers</li>

                <li className="pricing-list-item">digital experience</li>

                <li className="pricing-list-item">high-quality sound</li>

                <li className="pricing-list-item">standard content</li>
              </ul>

              <a className="link-fx-1 color-contrast-higher mt-4" href="selection">
                <span>Buy Ticket</span>
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

          <div className="col-lg-6 col-12 mt-4 mt-lg-0">
            <div className="pricing-thumb">
              <div className="d-flex">
                <div>
                  <h3>
                    <small>Standard</small> $240
                  </h3>

                  <p>What makes a premium festava?</p>
                </div>
              </div>

              <ul className="pricing-list mt-3">
                <li className="pricing-list-item">platform for potential customers</li>

                <li className="pricing-list-item">digital experience</li>

                <li className="pricing-list-item">high-quality sound</li>

                <li className="pricing-list-item">premium content</li>

                <li className="pricing-list-item">live chat support</li>
              </ul>

              <a className="link-fx-1 color-contrast-higher mt-4" href="selection">
                <span>Buy Ticket</span>
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
      </div>
    </section>
  );
};

export default PricingSection;
