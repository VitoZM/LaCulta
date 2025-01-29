import React from 'react';
import SummaryCard from './SummaryCard';
import BookingFormDetails from './BookingFormDetails';

const BookingFormStepTwo = ({ data }) => {
  return (
    <section style={{ paddingTop: 76 }}>
      <div className="card text-center">
        <div className="card-header">
          <b>RESERVA TU MESA EN LA CULTA</b>
          <br />
          Calle Beni #31
        </div>

        <div className="card-body col-10 mx-auto">
          {/* Summary Card */}
          {data && <SummaryCard people={data.people} date={data.date} time={data.time} />}

          {/* Form Component */}
          <BookingFormDetails data={data} />
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

export default BookingFormStepTwo;
