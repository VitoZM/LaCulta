import React from 'react';

import { useComponentTKey } from '../../../utils/i18n';
import { getLiteralDate } from '../../../utils/date.utils';
import Slider from '../../Slider';

const HeroSection = ({ event }) => {
  const { tKey } = useComponentTKey('hero_section');
  const { link, title, startDate } = event || {};
  const slides = [
    'images/logos/vertical-1.jpg',
    'images/logos/vertical-2.jpg',
    'images/logos/vertical-3.jpg',
    'images/logos/vertical-4.jpg',
  ];

  const handleBuyButton = () => {
    window.location.href = link;
  };

  return (
    <section className="hero-section" id="section_1">
      <div className="custom-video">
        <Slider images={slides} />
      </div>
    </section>
  );
};

export default HeroSection;
