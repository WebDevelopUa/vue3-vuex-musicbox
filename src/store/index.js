import { createStore } from 'vuex';
// @ - path from the 'src'
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
      console.log('... toggleAuthModal: (state) mutations ...', state.authModalShow);
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
      console.log('... toggleAuth: (state) mutations ...', state.userLoggedIn);
    },
  },
  getters: {
    // removed / replaced with 'mapState' from vuex
    // authModalShow: (state) => {
    //   console.log('... getter ...', state);
    //   return state.authModalShow;
  },
  actions: {
    // ctx, {commit} - gives access to the store (state, mutations)
    // payload - passed from dispatch function call
    async register({ commit }, payload) {
      // 1) request to Firebase Auth Service
      await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      // 2) request to Firebase Firestore Service
      await usersCollection.add({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      // Change user auth state in case of registration success
      commit('toggleAuth');
    },
  },
});
