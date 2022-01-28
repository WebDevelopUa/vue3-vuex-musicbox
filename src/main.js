import {
  createApp,
} from 'vue';
import VueGtag from 'vue-gtag-next';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';

import {
  auth,
} from './includes/firebase';

import './assets/tailwind.css';
import './assets/main.css';
import icon from '../directives/icon';
import i18n from './includes/i18n';
import './registerServiceWorker';

import GlobalComponents from './includes/_globals';

import ProgressBarr from './includes/progress-bar';
import 'nprogress/nprogress.css';

ProgressBarr(router);

// 1. Check the User Authenticated (load Firebase) before Vue App starts

// Firebase receiving the event is User logged in
let app;
auth.onAuthStateChanged(
  () => {
    if (!app) {
      app = createApp(App).use(i18n);
      app.use(VueGtag, {
        property: {
          id: 'G-CH6ZVMFR57',
          router,
        },
      });
      app.use(store);
      app.use(router);
      app.use(VeeValidatePlugin);

      app.use(GlobalComponents);

      app.directive('icon', icon);

      app.mount('#app');
    }
  },
);
