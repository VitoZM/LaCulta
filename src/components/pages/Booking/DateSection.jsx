import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'; // Import the calendar icon

// Helper function to format date as yyyy-mm-dd
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayFormattedDate = formatDate(new Date());
const defaultSelectedDateIndex = 1;

const DateSection = ({ onChange }) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(defaultSelectedDateIndex); // Store index of selected date button
  const selectedDateRef = useRef(null); // Store the actual date in yyyy-mm-dd format
  const [selectedDateState, setSelectedDateState] = useState(); // Store index of selected date button
  const [customDate, setCustomDate] = useState(false);

  const today = new Date();
  const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
  const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC',
  ];

  const handleButtonClick = (index) => {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + index);
    setSelectedDateIndex(index); // Set the index of the selected date button
    setSelectedDateState(futureDate);
    onChange(formatDate(futureDate));
  };

  useEffect(() => {
    if (customDate && selectedDateRef.current) {
      setTimeout(() => {
        selectedDateRef.current.showPicker();
      }, 0); // Delays execution to the next event loop
    }
    onChange(todayFormattedDate);
  }, [customDate]);

  useEffect(() => {
    handleButtonClick(defaultSelectedDateIndex);
  }, []);

  return (
    <section>
      <h5 className="card-title">
        {/* Calendar icon */}
        <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '40px', fontWeight: 'bold' }} />
        <p style={{ fontSize: '20px' }} className="mt-2">
          <b>FECHA</b>
        </p>
      </h5>

      {customDate ? (
        <div className="col-md-3 mx-auto">
          <div className="form-group">
            {/* Input type date to display a calendar */}
            <input
              type="date"
              className="form-control text-center"
              ref={selectedDateRef}
              defaultValue={todayFormattedDate}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="m-4 justify-content-center">
          {[...Array(7)].map((_, index) => {
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + index);
            const dayName = index === 0 ? 'HOY' : days[futureDate.getDay()];
            const day = futureDate.getDate();
            const month = months[futureDate.getMonth()];

            return (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={`btn btn-primary py-3 px-4 m-1 ${
                  selectedDateIndex === index ? 'selected' : ''
                }`}
              >
                <h3 style={{ fontSize: '14px', color: 'white' }}>{dayName}</h3>
                <h2 style={{ fontSize: '26px', color: 'white' }}>{day}</h2>
                <h3 style={{ fontSize: '14px', color: 'white' }}>{month}</h3>
              </button>
            );
          })}
          <button
            className="btn btn-primary py-3 px-4 m-1"
            onClick={() => {
              setCustomDate(true);
            }}
          >
            <h3 style={{ fontSize: '14px', color: '#e5432c' }}>.</h3>
            <h2 style={{ fontSize: '26px', color: 'white' }}>...</h2>
            <h3 style={{ fontSize: '14px', color: '#e5432c' }}>.</h3>
          </button>
        </div>
      )}
    </section>
  );
};

export default DateSection;
