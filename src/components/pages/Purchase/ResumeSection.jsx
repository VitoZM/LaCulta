import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import './PurchaseStyles/PaymentPage.css';

import PurchaseHeader from './PurchaseHeader';
import { tabs } from '../../../constants/tabs';
import { FetchTypes } from '../../../constants/fetch.config';
import { API_URL } from '../../../config/env';
import Table from './Table';

import { fetchData } from '../../../utils/fetchData';
import { useComponentTKey } from '../../../utils/i18n';

const { BLOB } = FetchTypes;

const PaymentSection = ({ data, eResume }) => {
  const { RESUME, PAYMENT } = tabs;
  const { event = {}, purchasedTickets = [], client = {}, amount, qr } = data;
  const { ci, phone, name, lastName, email } = client;
  const { iframe, startDate, title, link } = event;
  const [qrSrc, setQrSrc] = useState('');
  const [isPdfDownloaded, setIsPdfDownloaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { tKey } = useComponentTKey('resumeSection');

  useEffect(() => {
    if (qr) {
      setQrSrc(`data:image/png;base64, ${qr}`);
    }
  }, [qr]);

  const handleDownloadPDF = async () => {
    setIsFetching(true);
    const data = { eResume };
    try {
      const blob = await fetchData({
        url: `${API_URL}/payment/getPDF`,
        method: 'POST',
        data,
        type: BLOB,
      });
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', link + '.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setIsPdfDownloaded(true);
    } catch (error) {
      Bugsnag.notify(
        new Error(
          JSON.stringify({
            message: 'Error from ResumeSection.jsx->handleDownloadPDF',
            error,
          })
        )
      );
      console.error('Error downloading PDF:', error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <section className="ticket-section section-padding">
      <div className="section-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12 mx-auto">
            <PurchaseHeader tab={RESUME} iframe={iframe} title={title} startDate={startDate} />

            <div className="custom-form ticket-form">
              <h3 className="text-center">{tKey('paymentMade')}</h3>
              <p className="text-center">¡{tKey('thanks')}!</p>
              <img
                src={qrSrc}
                alt="qr"
                className="img-fluid mx-auto d-block"
                style={{ maxWidth: '100%', width: '300px' }}
              />

              <p className="text-center">{tKey('advice')} 😎🎉</p>
              <div className="container d-flex justify-content-center">
                <button
                  className="btn btn-danger w-50"
                  disabled={isPdfDownloaded}
                  onClick={handleDownloadPDF}
                >
                  {isFetching ? (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  ) : isPdfDownloaded ? (
                    tKey('successfulDownload')
                  ) : (
                    tKey('downloadPDF')
                  )}
                </button>
              </div>
              <div className="container d-flex justify-content-center">
                <Table ticketsArray={purchasedTickets} totalCost={amount} tab={PAYMENT} />
              </div>
            </div>

            <div className="custom-form ticket-form">
              <h3 className="text-center">{tKey('data')}</h3>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="ci">Carnet de Identidad</label>
                      <label className="form-control" id="ci">
                        {ci}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">Celular</label>
                      <label className="form-control" id="phone">
                        {phone}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Nombres</label>
                      <label className="form-control" id="name">
                        {name}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName">Apellidos</label>
                      <label className="form-control" id="lastName">
                        {lastName}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="email">Correo</label>
                      <div className="input-group">
                        <label className="form-control" id="email">
                          {email}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
