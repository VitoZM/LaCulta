import React, { useEffect, useState } from 'react';

import PreLoader from '../../PreLoader';
import Header from '../../Header';
import Navbar from '../../navbar/Navbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ArtistSection from './ArtistSection';
import Footer from '../../Footer';

import useScript from '../../../utils/useScript';
import { getUpcomingEvent } from '../../../utils/commonEventAPIs';

import { screens } from '../../../constants/screens';

const HomePage = () => {
  useScript('/js/click-scroll.js');
  const { HOME_PAGE } = screens;
  const [data, setData] = useState(null);
  const event = data?.event;

  useEffect(() => {
    getUpcomingEvent().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <main>
        <PreLoader />
        <Header />
        <Navbar currentPage={HOME_PAGE} link={event?.link} />
        <HeroSection event={event} />
        <AboutSection />
        <ArtistSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
