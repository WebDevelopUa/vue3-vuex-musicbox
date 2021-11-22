import { createStore } from 'vuex';

export default createStore({
  state: {
    authModalShow: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      console.log('... toggleAuthModal: (state) mutations ...', state.authModalShow);
      state.authModalShow = !state.authModalShow;
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
