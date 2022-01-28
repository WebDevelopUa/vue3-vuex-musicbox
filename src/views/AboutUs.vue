<template>
  <div class="about">
    <h1 class="text-green-500 text-center font-bold text-3xl">
      About
    </h1>
    <p class="text-center font-semibold">
      {{ aboutTitle }}
    </p>
    <p class="text-center font-semibold">
      {{ aboutDescription }}
    </p>
    <BaseGlobalButton/>
    <base-global-button/>
  </div>
</template>

<script>

import {
  mapState,
} from 'vuex';
import aboutModule from '@/store/modules/about';

export default {
  created() {
    // register about module Vue store dynamically
    this.$store.registerModule(
      'about',
      aboutModule,
    );
  },
  computed: {
    ...mapState({
      aboutTitle: (state) => state.about.title,
      aboutDescription: (state) => state.about.description,
    }),
  },
};
</script>
