<template>

  <AppHeader/>

  <!-- global plugin register component associated with a path -->
  <router-view></router-view>

  <!-- Player -->
  <AppPlayer/>

  <!-- Auth modal -->
  <Auth/>

</template>
<script>

import AppHeader from '@/components/Header.vue';
import Auth from '@/components/Auth.vue';
import AppPlayer from '@/components/Player.vue';

export default {
  name: 'App',
  components: {
    AppPlayer,
    Auth,
    AppHeader,
  },
  created() {
    console.log('created() {}');
    this.$store.dispatch('initLogin');
  },
};
</script>
