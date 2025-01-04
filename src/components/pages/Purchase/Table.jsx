import React, { memo } from 'react';
import { useComponentTKey } from '../../../utils/i18n';

import { tabs } from '../../../constants/tabs';
import Counter from '../../Counter';

const UNAVAILABLE = '0';
const AVAILABLE = '1';

const Table = (props) => {
  const { ticketsArray, handleTicketCountChange, totalCost, min, tab } = props;
  const { SELECTION } = tabs;
  const { tKey } = useComponentTKey('table');

  const TicketRow = memo(({ ticket }) => {
    const { ticketId, ticketName, price, count, quantity, totalCost, status, minimumQuantity } =
      ticket;
    const fare = parseFloat(price);

    return (
      <tr key={ticketId}>
        <td>{ticketName}</td>
        <td>{fare}</td>
        {status === UNAVAILABLE ? (
          <td className="text-center text-danger" colSpan={2}>
            <b>{tKey('soldOut')}</b>
          </td>
        ) : (
          <>
            <td>
              {tab === SELECTION ? (
                <Counter
                  value={count}
                  onChange={(newValue) => handleTicketCountChange(ticketId, newValue)}
                  minValue={min}
                  startingValue={minimumQuantity}
                />
              ) : (
                count || quantity
              )}
            </td>
            <td className="text-center">{tab === SELECTION ? fare * count : totalCost}</td>
          </>
        )}
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">{tKey('concept')}</th>
          <th scope="col">{tKey('price')} Bs.</th>
          <th scope="col">{tKey('quantity')}</th>
          <th scope="col" className="text-center">
            {tKey('total')} Bs.
          </th>
        </tr>
      </thead>
      <tbody>
        {ticketsArray?.map((ticket) => {
          const { ticketId, totalCost } = ticket;
          return totalCost || tab === SELECTION ? (
            <TicketRow ticket={ticket} key={ticketId} />
          ) : null;
        })}
        <tr>
          <td></td>
          <td></td>
          <td>
            <b>{tKey('total').toUpperCase()} (Bs.)</b>
          </td>
          <td className="text-center">
            <b>{totalCost}</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
