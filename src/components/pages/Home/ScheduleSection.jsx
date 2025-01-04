import React, { useRef, useState, useEffect } from 'react';

import { CCarousel, CCarouselItem, CCarouselCaption, CImage } from '@coreui/react';
import 'moment/dist/locale/es';
import { getCalendarDate } from '../../../utils/date.utils';

import { useComponentTKey } from '../../../utils/i18n';
import { getCurrentLanguage } from '../../../utils/i18n';

const ScheduleSection = () => {
  const { tKey } = useComponentTKey('schedule_section');
  const numberOfDays = 7;
  const currentLanguage = getCurrentLanguage();

  return (
    <section className="schedule-section section-padding" id="section_4">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-12 text-center">
            <h2 className="text-white mb-4">{tKey('title')}</h2>

            <div className="table-responsive mx-auto">
              <CCarousel controls indicators>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    src="/app-assets/events/pk-2.jpg"
                    alt="slide 1"
                  />
                  <CCarouselCaption
                    className="d-none d-md-block"
                    style={{ borderRadius: 2, backgroundColor: 'yellow', padding: 2 }}
                  >
                    <h5 className="text-dark">First slide label</h5>
                    <p className="text-dark">
                      Some representative placeholder content for the first slide.
                    </p>
                  </CCarouselCaption>
                </CCarouselItem>
              </CCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
