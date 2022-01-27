/* eslint-disable no-console */

import {
  register,
} from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('1) App is being served from cache by a service worker.');
    },
    registered() {
      console.log('2) Service worker has been registered.');
    },
    cached() {
      console.log('3) Content has been cached for offline use.');
    },
    updatefound() {
      console.log('4) New content is downloading.');
    },
    updated() {
      console.log('5) New content is available; please refresh.');
    },
    offline() {
      console.log('6) No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('7) Error during service worker registration:', error);
    },
  });
}
