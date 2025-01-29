import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import clock icon

const TimeSection = ({ onChange, showTimeAlert }) => {
  const [selectedTime, setSelectedTime] = useState('');

  // Function to generate time options from 10:00 AM to 9:30 PM
  const generateTimeOptions = () => {
    const times = [];
    let hour = 10;
    let minute = 0;

    while (hour < 22) {
      const amPm = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour > 12 ? hour - 12 : hour; // Convert 24-hour format to 12-hour
      const formattedMinute = minute === 0 ? '00' : '30';
      times.push(`${formattedHour}:${formattedMinute} ${amPm}`);

      // Increment time by 30 minutes
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
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
            {generateTimeOptions().map((time, index) => (
              <option key={index} value={time}>
                {time}
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
