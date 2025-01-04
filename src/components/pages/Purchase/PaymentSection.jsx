import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { saveAs } from 'file-saver';
import Bugsnag from '@bugsnag/js';

import './PurchaseStyles/PaymentPage.css';

import PurchaseHeader from './PurchaseHeader';
import DefaultModal from '../../modals/DefaultModal';
import Table from './Table';

import { tabs } from '../../../constants/tabs';
import { fetchData } from '../../../utils/fetchData';
import { API_URL } from '../../../config/env';
import { useComponentTKey } from '../../../utils/i18n';
import { getCurrentLanguage } from '../../../utils/i18n';

const validationSchema = Yup.object().shape({
  ci: Yup.string().required('Por favor llena este espacio'),
  phone: Yup.string().required('Por favor llena este espacio'),
  name: Yup.string().required('Por favor llena este espacio'),
  lastName: Yup.string().required('Por favor llena este espacio'),
  email: Yup.string().email('Email inválido').required('Por favor llena este espacio'),
});

const PaymentSection = ({ data, ePayment, hasToCheck }) => {
  const { tKey } = useComponentTKey('paymentSection');
  const { PAYMENT } = tabs;
  const { event = {}, order = {}, client } = data;
  const { ci, phone, name, lastName, email } = client || {};
  const { purchasedTickets = [], amount } = order;
  const { iframe, startDate, title } = event;
  const tipRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gloss, setGloss] = useState(null);

  const [isChecking, setIsChecking] = useState(false);
  const [isCheckingPaymentDone, setIsCheckingPaymentDone] = useState(false);
  const [hasToCheckPaymentDone, setHasToCheckPaymentDone] = useState(false);
  const [base64QR, setBase64QR] = useState(null);
  const [isDownloadButtonLoading, setIsDownloadButtonLoading] = useState(true);
  const [shouldShowAlert, setShouldShowAlert] = useState(true);
  const [eResumeState, setEResumeState] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState();

  const clientIsSet = () => client != null;

  const getQR = async (values) => {
    try {
      setShowModal(true);
      setIsDisabled(true);
      setLoading(true);
      // get values
      const ci = values.ci;
      const name = values.name;
      const lastName = values.lastName;
      const email = values.email;
      const phone = values.phone;

      // create a data object to send to the API
      const data = {
        ci,
        name,
        lastName,
        email,
        phone,
        ePayment,
        language: getCurrentLanguage(),
      };
      const result = await fetchData({
        url: `${API_URL}/payment/getQR`,
        method: 'POST',
        data,
      });
      setBase64QR(result.qr);
      setIsDownloadButtonLoading(false);
      setImageSrc(`data:image/png;base64, ${result.qr}`);
      setGloss(result.gloss);
      startChecking();
    } catch (error) {
      Bugsnag.notify(
        new Error(
          JSON.stringify({
            message: 'Error from PaymentSection.jsx->getQR',
            gloss,
            error,
          })
        )
      );
      console.debug(error);
    } finally {
      setLoading(false);
      setIsDisabled(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      ci: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      getQR(values);
      setIsChecking(true);
    },
  });

  useEffect(() => {
    if (hasToCheck) {
      setShowModal(true);
      setShouldShowAlert(true);
      setIsChecking(true);
    }
  }, [hasToCheck]);

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      if (shouldShowAlert) {
        e.returnValue = 'Si sales de la página el pago podría ser rechazado'; // Needed for browser compatibility
        return '¡Si sales de la página el pago podría ser rechazado!';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showModal, shouldShowAlert]);

  useEffect(() => {
    if (client) {
      formik.setValues({
        ci,
        name,
        lastName,
        email,
        phone,
      });
    }
  }, [client]);

  useEffect(() => {
    try {
      if (eResumeState != null) {
        window.location.href = `../resume/${eResumeState}`;
      }
    } catch (error) {
      Bugsnag.notify(
        new Error(
          JSON.stringify({
            message: 'Error from PaymentSection.jsx->useEffect Redirecting to resume',
            gloss,
            error,
            eResumeState,
          })
        )
      );
    }
  }, [eResumeState]);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const checkPayment = async () => {
      const result = await fetchData({
        url: `${API_URL}/payment/checkPayment`,
        method: 'POST',
        data: { ePayment },
      });

      const { isPaid } = result;
      if (isPaid) {
        clearInterval(intervalId);
        setIsChecking(false);
        setHasToCheckPaymentDone(true);
        setIsCheckingPaymentDone(true);
        setIsPaymentDone(true);
      }
    };

    if (isChecking) {
      try {
        checkPayment();
      } catch (error) {
        Bugsnag.notify(
          new Error(
            JSON.stringify({
              message: 'Error from PaymentSection.jsx->checkPayment',
              gloss,
              error,
              ePayment,
            })
          )
        );
      }

      intervalId = setInterval(() => {
        checkPayment();
      }, 5000); // fetch every 5 seconds

      timeoutId = setTimeout(() => {
        setIsChecking(false);
        setShouldShowAlert(false);
        window.location.reload();
      }, 60000 * 30); // stop after 30 minutes
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    }; // cleanup function to clear interval and timeout when component unmounts or isFetching changes
  }, [isChecking]);

  useEffect(() => {
    if (!hasToCheckPaymentDone) {
      return;
    }

    let intervalId;
    let timeoutId;

    const checkPaymentIsDone = async () => {
      const result = await fetchData({
        url: `${API_URL}/payment/checkPaymentIsDone`,
        method: 'POST',
        data: { ePayment },
      });

      const { paymentDone, eResume } = result;
      if (paymentDone) {
        clearInterval(intervalId);
        setIsCheckingPaymentDone(false);
        setShouldShowAlert(false);
        setEResumeState(eResume);
      }
    };

    if (isCheckingPaymentDone) {
      checkPaymentIsDone();

      intervalId = setInterval(() => {
        try {
          checkPaymentIsDone();
        } catch (error) {
          Bugsnag.notify(
            new Error(
              JSON.stringify({
                message: 'Error from PaymentSection.jsx->checkPaymentIsDone',
                gloss,
                error,
                ePayment,
              })
            )
          );
        }
      }, 5000); // fetch every 5 seconds

      timeoutId = setTimeout(() => {
        setIsCheckingPaymentDone(false);
        setShouldShowAlert(false);
      }, 60000 * 30); // stop after 30 minutes
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    }; // cleanup function to clear interval and timeout when component unmounts or isFetching changes
  }, [isCheckingPaymentDone, hasToCheckPaymentDone]);

  useEffect(() => {
    const tooltipScript = document.createElement('script');
    tooltipScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/js/bootstrap.bundle.min.js';
    tooltipScript.crossOrigin = 'anonymous';
    tooltipScript.onload = () => {
      new window.bootstrap.Tooltip(tipRef.current, {
        title: tKey('tooltip'),
        placement: 'top',
      });
    };
    document.body.appendChild(tooltipScript);
  }, []);

  const handleCloseModal = () => {
    stopChecking();
    //setShowModal(false);
  };

  const startChecking = () => setIsChecking(true);
  const stopChecking = () => setIsChecking(false);

  const getInputClasses = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return 'is-invalid';
    }
    return '';
  };

  const handleDownload = () => {
    setIsDownloadButtonLoading(true);
    // Convert the base64 string to a Blob object
    const byteCharacters = window.atob(base64QR);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust the type based on your image format

    // Save the blob as a file using the 'file-saver' package
    saveAs(
      blob,
      `${gloss.replaceAll('-', '').replace('  ', '').replaceAll(':', '').replaceAll(' ', '-')}.png`
    ); // Adjust the filename and extension as needed
    setIsDownloadButtonLoading(false);
  };

  return (
    <section className="ticket-section section-padding">
      <div className="section-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12 mx-auto">
            <PurchaseHeader tab={PAYMENT} iframe={iframe} title={title} startDate={startDate} />

            <div className="custom-form ticket-form">
              <h3 className="text-center">{tKey('title')}</h3>
              <div className="container d-flex justify-content-center">
                <Table ticketsArray={purchasedTickets} totalCost={amount} tab={PAYMENT} />
              </div>
            </div>

            <div className="custom-form__payment ticket-form">
              <h3 className="text-center">{tKey('information')}</h3>
              <div className="container mt-5">
                <form onSubmit={formik.handleSubmit} className="form-container">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="ci">{tKey('identification')}</label>
                        <input
                          type="text"
                          id="ci"
                          name="ci"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.ci}
                          readOnly={clientIsSet()}
                          className={`form-control ${getInputClasses('ci')}`}
                        />
                        {formik.touched.ci && formik.errors.ci && (
                          <div className="invalid-feedback mt-0 pt-0">{formik.errors.ci}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="phone">{tKey('phone')}</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          readOnly={clientIsSet()}
                          className={`form-control ${getInputClasses('phone')}`}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="invalid-feedback">{formik.errors.phone}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="name">{tKey('name')}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          readOnly={clientIsSet()}
                          className={`form-control ${getInputClasses('name')}`}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">{formik.errors.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label htmlFor="lastName">{tKey('lastName')}</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastName}
                          readOnly={clientIsSet()}
                          className={`form-control ${getInputClasses('lastName')}`}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                          <div className="invalid-feedback">{formik.errors.lastName}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="form-group">
                        <label htmlFor="email">{tKey('email')}</label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            readOnly={clientIsSet()}
                            className={`form-control ${getInputClasses('email')}`}
                          />
                          <div
                            className="input-group-append mt-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            ref={tipRef}
                          >
                            <button type="button" className="btn btn-secondary">
                              i
                            </button>
                          </div>
                          {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                      <button type="submit" className="btn btn-danger w-50" disabled={isDisabled}>
                        {tKey('generateButton')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {showModal ? (
              <DefaultModal
                handleCloseModal={handleCloseModal}
                title={tKey('QRTitle')}
                text1={loading ? tKey('generatingQR') : gloss}
                text2={tKey('redirectingMessage')}
                imageAlt={loading ? tKey('loading') : 'Image'}
                imageSrc={loading ? '/images/loader.gif' : imageSrc}
                imageStyle={
                  loading
                    ? { maxWidth: '75%', width: '250px' }
                    : { maxWidth: '100%', width: '400px' }
                }
                DownloadButton={() => (
                  <button
                    className="btn btn-danger mt-0 mx-auto d-block"
                    disabled={isDownloadButtonLoading}
                    onClick={handleDownload}
                  >
                    {tKey('downloadQR')}{' '}
                    {isDownloadButtonLoading && <div className="purchase__spinner"></div>}
                  </button>
                )}
                CustomButton={() => (
                  <button
                    className="btn btn-danger mt-1 mx-auto d-block"
                    disabled={true}
                    onClick={() => {}}
                  >
                    {isPaymentDone ? tKey('paymentDone') : tKey('waiting')}{' '}
                    <div className="purchase__spinner"></div>
                  </button>
                )}
                closeButtonDisabled={true}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
