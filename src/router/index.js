// vue ui => configuration => Vue CLI => Public path => update
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/AboutUs.vue';
import Manage from '@/views/Manage.vue';
import store from '@/store';
import Song from '@/views/Song.vue';

const routes = [
  {
    name: 'home',
    alias: '/home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about-us',
    component: About,
  },
  {
    name: 'manage',
    path: '/manage-music',
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('... Manage page Route Guard ...');
      next();
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

// Add router Global Guard to protect '/manage' from unauthorised users
// before every request

router.beforeEach(
  (to, from, next) => {
    // console.log('Global Guard - to.matched, from: ', to.matched, from);
    // check the META is user authenticated then check STATE user authenticated
    if (!to.matched.some((record) => record.meta.requiresAuth)) {
      next();
      return;
    }

    if (store.state.auth.userLoggedIn) {
      next();
    } else {
      next({ name: 'home' });
    }
  },
);

export default router;
