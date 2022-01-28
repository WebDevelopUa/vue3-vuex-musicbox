<template>

  <!-- Auth modal -->
  <Auth/>

  <AppHeader/>

  <!-- global plugin register component associated with a path -->
    <router-view v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <Component :is="Component"></Component>
      </Transition>
    </router-view>

  <!-- Player -->
    <AppPlayer/>

</template>
<script>

import Auth from '@/components/Auth.vue';
import AppHeader from '@/components/Header.vue';
import AppPlayer from '@/components/Player.vue';

export default {
  name: 'App',
  components: {
    Auth,
    AppHeader,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
