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
    // 1. retrieve ID generated by Auth Service from Firebase
    // 2. update request to store UID
    // 3. Firestore DB document ID = Authentication User UID

    // ctx, {commit} - gives access to the store (state, mutations)
    // payload - passed from dispatch function call

    async register({ commit }, payload) {
      // 1) request to Firebase Auth Service
      const userCredentials = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      // 2) request to Firebase Firestore Service; add UID to DB
      await usersCollection.doc(userCredentials.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      // Every user registered has Profile
      await userCredentials.user.updateProfile({
        displayName: payload.name,
      });

      // Change user auth state in case of registration success
      commit('toggleAuth');
    },

    // 2. Check the User Authenticated (load Firebase) before Vue App init
    initLogin({ commit }) {
      const user = auth.currentUser;

      console.log('initLogin({ commit }) {}', user);

      if (user) {
        console.log('if (user){ commit(\'toggleAuth\') }');
        commit('toggleAuth');
      }
    },
  },
});
