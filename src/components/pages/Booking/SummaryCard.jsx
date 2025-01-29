import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
  // Parse the date correctly
  const date = new Date(dateString);

  // Make sure the date is valid
  if (isNaN(date)) {
    return ''; // or some default string indicating invalid date
  }

  // Format the date
  return date.toLocaleDateString('es-BO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return new Intl.DateTimeFormat('es-ES', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

const SummaryCard = ({ people, date, time }) => {
  return (
    <div className="card mb-4 p-3 shadow-sm">
      <h5 className="mb-3">
        <b>Detalles de tu reserva</b>
      </h5>
      <div className="d-flex justify-content-around align-items-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faUserFriends} size="2x" style={{ color: 'black' }} />
          <p className="mt-2">
            <b>{people}</b> personas
          </p>
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={faCalendar} size="2x" style={{ color: 'black' }} />
          <p className="mt-2">
            <b>{formatDate(date + ' ' + time)}</b>
          </p>
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={faClock} size="2x" style={{ color: 'black' }} />
          <p className="mt-2">
            <b>{formatTime(time)}</b>
          </p>
        </div>
      </div>

      {/* MODIFICAR Button */}
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={() => (window.location.href = 'booking')}>
          MODIFICAR
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;
