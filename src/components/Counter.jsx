import React, { memo } from 'react';
import './pages/Purchase/PurchaseStyles/TicketSection.css';
const Counter = ({ value, onChange, minValue, startingValue }) => {
  const handleDecrement = () => {
    if (value <= startingValue) {
      onChange(0);
      return;
    }
    if (value > minValue) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < startingValue) {
      onChange(startingValue);
      return;
    }
    onChange(value + 1);
  };

  return (
    <div className="counter">
      <button onClick={handleDecrement}>-</button>
      <span>{value}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default memo(Counter);
