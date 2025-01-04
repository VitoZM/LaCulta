import React from "react";

import { useComponentTKey } from "../../../utils/i18n";

const AboutSection = () => {
  const { tKey } = useComponentTKey("about_section");

  return (
    <section className="about-section section-padding" id="section_2">
      <div className="container">
        <div className="row bg-shadow">
          <div className="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
            <div className="services-info">
              <h2 className="text-white mb-4">{tKey("about")}</h2>

              <p className="text-white">{tKey("about_description")}.</p>

              <h6 className="text-white mt-4">{tKey("once")}</h6>

              <p className="text-white">{tKey("once_description")}.</p>

              <h6 className="text-white mt-4">{tKey("whole")}</h6>

              <p className="text-white">{tKey("whole_description")}.</p>
            </div>
          </div>

          <div className="col-lg-6 col-12">
            <div className="about-text-wrap">
              <img
                src="images/happy-people.jpg"
                className="about-image img-fluid"
              />

              <div className="about-text-info d-flex">
                <div className="d-flex">
                  <i className="about-text-icon bi-moon-stars-fill"></i>
                </div>

                <div className="ms-4">
                  <h3>{tKey("magic")}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
