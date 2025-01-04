import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../Header';
import Navbar from '../../navbar/Navbar';
import Footer from '../../Footer';
import TicketSection from './TicketSection';
import Popup from '../../Popup';

import { screens } from '../../../constants/screens';
import { fetchData } from '../../../utils/fetchData';
import { API_URL } from '../../../config/env';
import { useState } from 'react';
import { useComponentTKey } from '../../../utils/i18n';

//firstly we need to add a function which lets us to get the event name from the url
//after that we need to get the event data from the api params
const SelectionPage = () => {
  const { event } = useParams();
  const { PURCHASE_PAGE } = screens;
  const [data, setData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { tKey } = useComponentTKey('selectionPage');

  useEffect(() => {
    const getEvent = async () => {
      const result = await fetchData({
        url: `${API_URL}/event/getEvent`,
        method: 'POST',
        data: { event },
      });
      const successs = result.success;
      if (successs) {
        setData(result);
        return;
      }
      setIsPopupOpen(true);
    };
    if (event) {
      getEvent();
    }
  }, [event]);

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
        <TicketSection data={data} />
      </main>
      <Footer />
    </>
  );
};

export default SelectionPage;
