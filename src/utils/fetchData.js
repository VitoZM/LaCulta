import Bugsnag from '@bugsnag/js';

import { FetchTypes } from '../constants/fetch.config';

const { _JSON, BLOB, TEXT } = FetchTypes;

export function fetchData({ url, data, method = 'GET', headers = {}, type = null }) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: method,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    fetch(url, requestOptions)
      .then((response) => {
        switch (type) {
          case BLOB:
            return response.blob();
          case TEXT:
            return response.text();
          case _JSON:
            return response.json();
          default:
            return response.json();
        }
      })
      .then((json) => resolve(json))
      .catch((error) => {
        Bugsnag.notify(
          new Error(
            JSON.stringify({
              message: `Error from fetchData.js to -> ${url} | method -> ${method} | data -> ${JSON.stringify(
                data
              )}`,
              error,
            })
          )
        );
        reject(error);
      });
  });
}
