import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const PeopleSection = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState(2); // Default selected button is "2"
  const [customQuantity, setCustomQuantity] = useState(false);

  const toggleCustomQuantity = () => setCustomQuantity(!customQuantity);

  const handleButtonClick = (value) => {
    setSelectedValue(value);
  };

  const handleCustomQuantityChange = (increment) => {
    setSelectedValue((prevValue) => {
      const newValue = prevValue + increment;
      if (newValue < 2) return 2;
      if (newValue > 99) return 99;
      return newValue;
    });
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  return (
    <section>
      <h5 className="card-title">
        <FontAwesomeIcon icon={faUsers} style={{ fontSize: '50px', fontWeight: 'bold' }} />
        <p style={{ fontSize: '20px' }}>
          <b>PERSONAS</b>
        </p>
      </h5>
      <div className="m-4">
        {customQuantity ? (
          <div className="m-4 d-flex justify-content-center align-items-center">
            {/* Minus Button */}
            <button
              className="btn btn-primary py-3 px-4 m-1"
              onClick={() => handleCustomQuantityChange(-1)}
            >
              -
            </button>

            {/* Input Field */}
            <input
              type="number"
              className="form-control text-center mx-2"
              style={{
                width: '120px',
                fontSize: '18px',
                fontWeight: 'bold',

                backgroundColor: 'transparent',
                border: '2px solid #ccc',
              }}
              value={selectedValue}
              readOnly
            />

            {/* Plus Button */}
            <button
              className="btn btn-primary py-3 px-4 m-1"
              onClick={() => handleCustomQuantityChange(1)}
            >
              +
            </button>
          </div>
        ) : (
          <div className="m-4">
            {/* First Row Buttons */}
            {[1, 2, 3].map((num, index) => (
              <button
                key={num}
                onClick={() => handleButtonClick(num)}
                className={`btn btn-primary py-3 px-4 m-1 ${
                  selectedValue === num ? 'selected' : ''
                }`}
              >
                {num}
              </button>
            ))}

            {/* Second Row Buttons */}
            {[4, 5, 6].map((num, index) => (
              <button
                key={num}
                onClick={() => handleButtonClick(num)}
                className={`btn btn-primary py-3 px-4 m-1 ${
                  selectedValue === num ? 'selected' : ''
                }`}
              >
                {num}
              </button>
            ))}

            {/* Plus Button */}
            <button className="btn btn-primary py-3 px-4 m-1" onClick={toggleCustomQuantity}>
              +
            </button>
          </div>
        )}
      </div>

      {customQuantity && <div className="m-4"></div>}
    </section>
  );
};

export default PeopleSection;
