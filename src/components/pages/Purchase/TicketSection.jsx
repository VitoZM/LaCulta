import React, { useState, useEffect } from 'react';
import TermsAndConditions from './TermsAndConditions';
import PurchaseHeader from './PurchaseHeader';
import TableAccordion from '../../inputs/TableAccordion';

import { tabs } from '../../../constants/tabs';
import { fetchData } from '../../../utils/fetchData';
import { useComponentTKey } from '../../../utils/i18n';
import { getCurrentLanguage } from '../../../utils/i18n';
import { languages } from '../../../constants/languages';

import { API_URL } from '../../../config/env';
import Table from './Table';

const MINIMUM_COUNT = 0;
const { SPANISH, ENGLISH } = languages;

const TicketSection = ({ data }) => {
  const { tKey } = useComponentTKey('ticketSection');
  const { event = {}, tickets, ticketGroups } = data;
  const { iframe, startDate, title, pageSpanishTitle, pageEnglishTitle } = event;
  const hasGroupedTickets = event?.hasGroupedTickets === '1';
  const [checked, setChecked] = useState(false);
  const [ticketsArray, setTicketsArray] = useState([]);
  const { SELECTION } = tabs;
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const language = getCurrentLanguage();

  const isDisabled = () => {
    return !checked || totalCost <= 0;
  };

  const handleCheck = (checked) => {
    setChecked(checked);
  };

  const generateOrder = async () => {
    const result = await fetchData({
      url: `${API_URL}/event/generateOrder`,
      method: 'POST',
      data: { eventId: event.eventId, tickets: ticketsArray.filter((ticket) => ticket.count > 0) },
    });
    const { ePayment, success } = result;
    if (success) {
      window.location.href = `../payment/${ePayment}`;
    }
  };

  const handleNextButton = () => {
    setIsLoading(true);
    generateOrder();
  };

  const handleTicketCountChange = (ticketId, count) => {
    setTicketsArray((prevTickets) =>
      prevTickets.map((ticket) => (ticket.ticketId === ticketId ? { ...ticket, count } : ticket))
    );
  };

  const hasChangedGroup = () => {
    setTicketsArray((prevTickets) => prevTickets.map((ticket) => ({ ...ticket, count: 0 })));
  };

  useEffect(() => {
    if (tickets) {
      setTicketsArray(
        tickets.map((ticket) => {
          return { ...ticket, count: MINIMUM_COUNT };
        })
      );
    }
  }, [tickets]);

  useEffect(() => {
    setTotalCost(
      ticketsArray.reduce((acc, ticket) => {
        const { count, price } = ticket;
        return acc + count * price;
      }, 0)
    );
  }, [ticketsArray]);

  return (
    <section className="ticket-section section-padding">
      <div className="section-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12 mx-auto">
            <PurchaseHeader tab={SELECTION} iframe={iframe} title={title} startDate={startDate} />

            <div className={`custom-form ticket-form ${hasGroupedTickets ? 'px-0' : ''}`}>
              {pageSpanishTitle && language === SPANISH ? (
                <h3 className="text-center">{pageSpanishTitle}</h3>
              ) : pageSpanishTitle && language === ENGLISH ? (
                <h3 className="text-center">{pageEnglishTitle}</h3>
              ) : (
                <h3 className="text-center">{tKey('title')}</h3>
              )}

              <div className="container d-flex justify-content-center">
                {hasGroupedTickets ? (
                  <TableAccordion
                    handleTicketCountChange={handleTicketCountChange}
                    ticketsArray={ticketsArray}
                    totalCost={totalCost}
                    MINIMUM_COUNT={MINIMUM_COUNT}
                    SELECTION={SELECTION}
                    ticketGroups={ticketGroups}
                    hasChangedGroupFunction={hasChangedGroup}
                  />
                ) : (
                  <Table
                    handleTicketCountChange={handleTicketCountChange}
                    ticketsArray={ticketsArray}
                    totalCost={totalCost}
                    min={MINIMUM_COUNT}
                    tab={SELECTION}
                  />
                )}
              </div>
            </div>

            <div className="custom-form ticket-form">
              <h3 className="text-center">{tKey('termsAndConditions')}</h3>
              <TermsAndConditions onChange={handleCheck} />
            </div>

            <div className="custom-form ticket-form">
              <div className="text-center">
                <button
                  className="btn btn-danger"
                  disabled={isDisabled() || isLoading}
                  onClick={handleNextButton}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  ) : (
                    tKey('nextButton')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
