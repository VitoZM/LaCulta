import React from 'react';

import { isSpanishSite } from '../../utils/i18n';

import Table from '../pages/Purchase/Table';

const TableAccordion = (props) => {
  const {
    ticketsArray,
    handleTicketCountChange,
    totalCost,
    MINIMUM_COUNT,
    SELECTION,
    ticketGroups,
    hasChangedGroupFunction,
  } = props;

  const trial = () => {
    hasChangedGroupFunction();
  };

  return (
    <div className="accordion col-12" id="accordion">
      {ticketGroups?.map((group, index) => {
        const {
          spanishTitle,
          englishTitle,
          spanishDescription,
          englishDescription,
          ticketGroupId,
        } = group;
        const tickets = ticketsArray.filter((ticket) => ticket.ticketGroupId === ticketGroupId);
        return (
          <div className="accordion-item w-100" key={`option-${index}`}>
            <h4
              className="accordion-header d-flex justify-content-between"
              id={`heading${index}`}
              onClick={trial}
            >
              <label className="form-check-label m-2 w-100" htmlFor={`radio${index}`}>
                {isSpanishSite() ? spanishTitle : englishTitle}
              </label>
              <input
                className="form-check-input m-2"
                type="radio"
                name="radio"
                id={`radio${index}`}
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              />
            </h4>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordion"
            >
              <div className="accordion-body">
                {isSpanishSite() ? spanishDescription : englishDescription}
                <Table
                  handleTicketCountChange={handleTicketCountChange}
                  ticketsArray={tickets}
                  totalCost={totalCost}
                  min={MINIMUM_COUNT}
                  tab={SELECTION}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableAccordion;
