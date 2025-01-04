import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../Header';
import Navbar from '../../navbar/Navbar';
import Footer from '../../Footer';
import PaymentSection from './PaymentSection';
import Popup from '../../Popup';

import { screens } from '../../../constants/screens';
import { API_URL } from '../../../config/env';
import { fetchData } from '../../../utils/fetchData';
import { useComponentTKey } from '../../../utils/i18n';

const PaymentPage = () => {
  const { PURCHASE_PAGE } = screens;
  const { ePayment } = useParams();
  const [data, setData] = useState({ isPaid: false });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { tKey } = useComponentTKey('paymentPage');
  const [hasToCheck, setHasToCheck] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      const result = await fetchData({
        url: `${API_URL}/payment/getOrder`,
        method: 'POST',
        data: { ePayment },
      });
      const { success, isPaid } = result;
      if (success) {
        setHasToCheck(isPaid);
        if (result?.client != null) {
          setHasToCheck(true);
        }
        setData(result);
        return;
      }
      setIsPopupOpen(true);
    };
    if (ePayment) {
      getOrder();
    }
  }, [ePayment]);

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
        <PaymentSection data={data} ePayment={ePayment} hasToCheck={hasToCheck} />
      </main>
      <Footer />
    </>
  );
};

export default PaymentPage;
