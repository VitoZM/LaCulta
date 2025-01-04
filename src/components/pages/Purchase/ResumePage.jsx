import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../Header';
import Navbar from '../../navbar/Navbar';
import Footer from '../../Footer';
import ResumeSection from './ResumeSection';
import Popup from '../../Popup';

import { screens } from '../../../constants/screens';
import { API_URL } from '../../../config/env';
import { fetchData } from '../../../utils/fetchData';
import { useComponentTKey } from '../../../utils/i18n';

const PaymentPage = () => {
  const { PURCHASE_PAGE } = screens;
  const { eResume } = useParams();
  const [data, setData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { tKey } = useComponentTKey('resumePage');

  useEffect(() => {
    try {
      const getPayment = async () => {
        const result = await fetchData({
          url: `${API_URL}/payment/getPayment`,
          method: 'POST',
          data: { eResume },
        });
        const { success } = result;
        if (success) {
          setData(result);
          return;
        }
        setIsPopupOpen(true);
      };
      if (eResume) {
        getPayment();
      }
    } catch (error) {
      Bugsnag.notify(
        new Error(
          JSON.stringify({
            message: 'Error from ResumePage.jsx->getPayment',
            eResume,
            error,
          })
        )
      );
    }
  }, [eResume]);

  return (
    <>
      <main>
        <Header />
        {isPopupOpen && (
          <Popup
            closePopup={() => {
              setIsPopupOpen(false);
            }}
            title="Oops!"
            content={tKey('popup')}
          />
        )}
        <Navbar currentPage={PURCHASE_PAGE} />
        <ResumeSection data={data} eResume={eResume} />
      </main>
      <Footer />
    </>
  );
};

export default PaymentPage;
