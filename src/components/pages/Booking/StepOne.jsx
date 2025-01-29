import React from 'react';

import PreLoader from '../../PreLoader';
import Header from '../../Header';
import Navbar from '../../navbar/Navbar';
import BookingForm from './BookingForm';
import Footer from '../../Footer';

import { screens } from '../../../constants/screens';

const StepOne = () => {
  const { STEP_ONE } = screens;

  return (
    <>
      <main>
        <PreLoader />
        <Header />
        <Navbar currentPage={STEP_ONE} />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
};

export default StepOne;
