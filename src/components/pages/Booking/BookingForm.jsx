import React, { useState } from 'react';
import PeopleSection from './PeopleSection';
import DateSection from './DateSection';
import TimeSection from './TimeSection';

const BookingForm = () => {
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  return (
    <section style={{ paddingTop: 76 }}>
      <div className="card text-center">
        <div className="card-header">
          <b>RESERVA TU MESA EN LA CULTA</b>
          <br />
          Calle Beni #31
        </div>
        <div className="card-body col-10 mx-auto">
          <PeopleSection onChange={setPeople} />
          <hr />
          <DateSection onChange={setDate} />
          <hr />
          <TimeSection onChange={setTime} showTimeAlert={showTimeAlert} />
          <hr />
          <button
            className="btn btn-primary py-3 px-5"
            style={{ fontSize: '20px' }}
            onClick={() => {
              console.log({ people, date, time });
              if (time === '') {
                setShowTimeAlert(true);
              } else {
                setShowTimeAlert(false);
              }
            }}
          >
            CONTINUAR
          </button>
        </div>
        <div className="card-footer text-muted">
          ¿Tienes dudas? Escríbenos o llámanos al
          <a href="https://wa.me/59173411989" target="_blank" rel="noreferrer">
            +591 73411989
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
