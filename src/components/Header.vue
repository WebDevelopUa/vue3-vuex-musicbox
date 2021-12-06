<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">

      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4 no-active"
                   :to="{name: 'home'}"
                   exact-active-class="no-active"
      >
        MusicBox
      </router-link>

      <div class="flex flex-grow items-center">

        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">

          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white"
                         :to="{name: 'about'}"
            >
              About
            </router-link>
          </li>

          <li v-if="!userLoggedIn">
            <!-- Open modal dialog window   -->
            <a class="px-2 text-white"
               @click.prevent="toggleAuthModal"
               href="#">
              Login / Register
            </a>
          </li>

          <template v-else>
            <li>
              <router-link class="px-2 text-white"
                           :to="{name: 'manage'}"
              >
                Manage
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white"
                 @click.prevent="signOut"
                 href="#">
                Logout
              </a>
            </li>

          </template>

        </ul>

      </div>
    </nav>
  </header>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),

    // dispatch signOut action from component
    signOut() {
      this.$store.dispatch('signOut');

      // check meta value from router
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }

      // replaced with Route meta fields logic
      // if (this.$route.name === 'manage') {
      //   // redirect user to Homepage from Manage page
      //   this.$router.push({ name: 'home' });
      // }
    },

    // replaced with signOut(){} method
    // ...mapActions(['signOut']),

    // replaced with mapMutations from 'vuex'
    // toggleAuthModal() {
    //   console.log('... toggleAuthModal() ...', this.$store.state.authModalShow);
    //   // this.$store.state.authModalShow = !this.$store.state.authModalShow;
    //   // call 'toggleAuthModal' from the store
    //   this.$store.commit('toggleAuthModal');
    // },

  },
};
</script>
