// vue ui => configuration => Vue CLI => Public path => update
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

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
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },

  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

// Add router guard to protect '/manage' from unauthorised users
// before every request
router.beforeEach(
  (to, from, next) => {
    console.log('Global Guard - to, from: ', to, from);
    next();
  },
);

export default router;
