import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import { fetchData } from '../../../utils/fetchData';
import { API_URL } from '../../../config/env';

const sectors = [
  { value: '1', label: 'Patio' },
  { value: '2', label: 'Salón del Tapado' },
  { value: '3', label: 'Salón del Dinosaurio' },
  { value: '4', label: 'Salón de la Independencia' },
];

const BookingFormDetails = ({ data }) => {
  const { people, date, time } = data || {};
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleBook = async (formData) => {
    setLoading(true); // Start loading

    // Format bookingDateShown
    const formattedDate = `${date} ${time}`;
    const bookingDateShown = new Date(formattedDate).toLocaleString('es-BO', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    try {
      const response = await fetchData({
        url: `${API_URL}/reserve/create`,
        method: 'POST',
        data: {
          bookingDate: formattedDate,
          sector: formData.sector,
          name: formData.fullName, // Assuming you have fullName value from the form
          email: formData.email, // Assuming you have email value from the form
          phone: formData.phone.replace('+', ''), // Assuming you have phone value from the form
          quantity: people, // Assuming you have people value from the form
          bookingDateShown: bookingDateShown,
        },
      });

      setLoading(false); // Stop loading

      if (response.success) {
        // Show success pop-up and redirect when it gets closed
        Swal.fire('Reserva confirmada', '¡Su reserva ha sido confirmada!', 'success').then(() => {
          sessionStorage.removeItem('data');
          window.location.href = 'booking'; // Redirect to desired page
        });
      } else {
        // Show an error pop-up if the time is unavailable
        Swal.fire({
          icon: 'error',
          title: 'Hora no disponible',
          text: response.message || 'Por favor, selecciona otro horario.',
        });
        window.location.href = 'booking';
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

  const validateForm = () => {
    if (!termsAccepted) {
      Swal.fire('Error', 'Debe aceptar los términos y condiciones', 'error');
      return false;
    }
    return true;
  };

  const onSubmit = (formData) => {
    if (validateForm()) {
      handleBook(formData);
      console.log({ ...formData, people, date, time });
    }
  };

  const handleTermsClick = () => {
    Swal.fire({
      title: 'Términos Y Condiciones',
      text: 'Su reserva tiene una tolerancia de 10 mins. Se ruega puntualidad para no perder su mesa, la administración.',
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      {/* Sector */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="sector-label">Sector</InputLabel>
        <Controller
          name="sector"
          control={control}
          rules={{ required: 'Por favor seleccione un sector' }}
          render={({ field }) => (
            <Select
              {...field}
              labelId="sector-label"
              label="Sector"
              onChange={(val) => setValue('sector', val.target.value)}
              fullWidth
              error={!!errors.sector}
            >
              {sectors.map((sector) => (
                <MenuItem key={sector.value} value={sector.value}>
                  {sector.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.sector && <span className="text-danger">{errors.sector.message}</span>}
      </FormControl>

      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        rules={{ required: 'Por favor ingrese su Nombre y Apellido' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre Completo"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName && errors.fullName.message}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Por favor ingrese un email válido',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Por favor ingrese un email válido',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
        )}
      />

      {/* Phone Number */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000',
            display: 'block',
            marginBottom: '8px', // Spacing between label and input
          }}
        >
          Número de teléfono
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'Por favor ingrese un número de teléfono válido' }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              placeholder="Número de teléfono"
              defaultCountry="BO"
              international
              className="phone-input"
              onChange={(val) => setValue('phone', val)}
            />
          )}
        />
      </div>

      {errors.phone && <span className="text-danger">{errors.phone.message}</span>}

      {/* Terms and Conditions */}
      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              if (e.target.checked) {
                handleTermsClick();
              }
            }}
            name="terms"
          />
        }
        label={
          <>
            Acepto los{' '}
            <span style={{ color: '#7a72b1', cursor: 'pointer' }} onClick={handleTermsClick}>
              términos y condiciones
            </span>
          </>
        }
      />
      <hr />
      {/* Submit Button */}
      <button
        className="btn btn-primary py-3 px-5"
        style={{ fontSize: '20px' }}
        type="submit"
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          'CONFIRMAR RESERVA'
        )}
      </button>
    </form>
  );
};

export default BookingFormDetails;
