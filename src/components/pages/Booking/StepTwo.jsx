import React, { useEffect, useState } from 'react';

import PreLoader from '../../PreLoader';
import Header from '../../Header';
import Navbar from '../../navbar/Navbar';
import BookingFormStepTwo from './BookingFormStepTwo';
import Footer from '../../Footer';

import { screens } from '../../../constants/screens';

const StepTwo = () => {
  const { STEP_TWO } = screens;
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.data;
    if (!data) {
      window.location.href = 'booking';
    }
    setData(JSON.parse(data));
  }, []);

  return (
    <>
      <main>
        <PreLoader />
        <Header />
        <Navbar currentPage={STEP_TWO} />
        <BookingFormStepTwo data={data} />
      </main>
      <Footer />
    </>
  );
};

export default StepTwo;
