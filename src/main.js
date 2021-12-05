import { createApp } from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';

import { auth } from './includes/firebase';

import './assets/tailwind.css';
import './assets/main.css';

// 1. Check the User Authenticated (load Firebase) before Vue App starts

// Firebase receiving the event is User logged in
let app;
auth.onAuthStateChanged(
  () => {
    if (!app) {
      app = createApp(App);
      app.use(VueAnalytics, {
        id: 'G-CH6ZVMFR57',
        router,
      });
      app.use(store);
      app.use(router);
      app.use(VeeValidatePlugin);
      app.mount('#app');
    }
  },
);
