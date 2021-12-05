import { createStore } from 'vuex';

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
    // },
  },
});
