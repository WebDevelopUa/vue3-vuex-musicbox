<template>
  <AppHeader/>

  <Home/>

  <Auth/>
</template>
<script>

import AppHeader from '@/components/Header.vue';
import Home from '@/views/Home.vue';
import Auth from '@/components/Auth.vue';

export default {
  name: 'App',
  components: {
    Auth,
    Home,
    AppHeader,
  },
};
</script>
