import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';

Bugsnag.start({
  apiKey: '885cbe9732efb840d94fa1401e6cdb77',
  plugins: [new BugsnagPluginReact()],
});
BugsnagPerformance.start({ apiKey: '885cbe9732efb840d94fa1401e6cdb77' });

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { getCurrentLanguage } from './utils/i18n';

import global_es from './translations/es/global.json';
import global_en from './translations/en/global.json';

import { Provider } from 'react-redux';
import { store } from './app/store';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

i18next.init({
  interpolation: { escapeValue: false },
  lng: getCurrentLanguage(),
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </I18nextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
