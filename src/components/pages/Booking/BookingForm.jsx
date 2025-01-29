import React, { useState } from 'react';
import PeopleSection from './PeopleSection';
import DateSection from './DateSection';
import TimeSection from './TimeSection';
import { API_URL } from '../../../config/env';
import { fetchData } from '../../../utils/fetchData';
import Swal from 'sweetalert2'; // Import SweetAlert2

const BookingForm = () => {
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [loading, setLoading] = useState(false); // For managing the button state

  const handleBooking = async () => {
    console.log({ people, date, time });
    if (time === '') {
      setShowTimeAlert(true);
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetchData({
        url: `${API_URL}/reserve/invalidDate`,
        method: 'POST',
        data: { date: `${date} ${time}` },
      });

      setLoading(false); // Stop loading

      if (response.success) {
        // Redirect if successful
        sessionStorage.data = JSON.stringify({ people, date, time });
        window.location.href = 'booking-2';
      } else {
        // Show an error pop-up if the time is unavailable
        Swal.fire({
          icon: 'error',
          title: 'Hora no disponible',
          text: response.message || 'Por favor, selecciona otro horario.',
        });
      }
    } catch (error) {
      setLoading(false); // Stop loading on error

      // Show error pop-up if an exception occurs
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

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
            onClick={handleBooking}
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              'CONTINUAR'
            )}
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
