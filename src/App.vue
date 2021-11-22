<template>
  <AppHeader/>

  <Home/>
</template>
<script>

import AppHeader from '@/components/Header.vue';
import Home from '@/views/Home.vue';

export default {
  name: 'App',
  components: {
    Home,
    AppHeader,
  },
};
</script>
