import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import clock icon

const TimeSection = ({ onChange, showTimeAlert }) => {
  const [selectedTime, setSelectedTime] = useState('');

  // Function to generate time options in 24-hour format but display them in 12-hour format
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 10; hour < 22; hour++) {
      for (let minute of [0, 30]) {
        const value = `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`; // 24-hour format
        const displayHour = hour > 12 ? hour - 12 : hour; // Convert 24-hour to 12-hour format
        const amPm = hour < 12 ? 'AM' : 'PM';
        const displayText = `${displayHour}:${minute === 0 ? '00' : '30'} ${amPm}`;
        times.push({ value, displayText });
      }
    }
    return times;
  };

  return (
    <section>
      <h5 className="card-title">
        <FontAwesomeIcon icon={faClock} style={{ fontSize: '40px', fontWeight: 'bold' }} />
        <p style={{ fontSize: '20px' }} className="mt-2">
          <b>HORA</b>
        </p>
      </h5>
      <div className="col-md-3 mx-auto">
        <div className="form-group">
          <select
            className="form-control text-center"
            value={selectedTime}
            onChange={(e) => {
              const time = e.target.value;
              setSelectedTime(time);
              onChange(time);
            }}
          >
            <option value="">Selecciona una hora</option>
            {generateTimeOptions().map(({ value, displayText }, index) => (
              <option key={index} value={value}>
                {displayText}
              </option>
            ))}
          </select>
        </div>

        {/* Red alert message when time is not selected */}
        {showTimeAlert && (
          <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
            ⚠️ Debes seleccionar una hora para continuar.
          </p>
        )}
      </div>
    </section>
  );
};

export default TimeSection;
