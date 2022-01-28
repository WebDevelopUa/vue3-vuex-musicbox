// @ - path from the 'src'
import {
  Howl,
} from 'howler';
import helper from '@/includes/helper';

export default {
  state: {
    // init the Song State
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  getters: {
    // Vuex allows us to define "getters" in the store.
    // You can think of them as computed properties for stores.
    // getter's result is cached based on its dependencies,
    // and will only re-evaluate when some of its dependencies have changed
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },

    // removed / replaced with 'mapState' from vuex
    // authModalShow: (state) => {
    //   console.log('... getter ...', state);
    //   return state.authModalShow;
  },
  actions: {

    //  play new song from the Song State
    async newSong({ commit, state, dispatch }, payload) {
      // deleting the instance of Howl
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }

      commit('newSong', payload);

      state.sound.play();

      // update Song State property when start playing
      // listen the event 'play'
      state.sound.on('play',
        () => requestAnimationFrame(
          () => dispatch('progress'),
        ));

      console.log('newSong({ commit }, payload) action');
    },

    async toggleAudio({ state }) {
      console.log(' async toggleAudio({state})');

      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },

    progress({ commit, state, dispatch }) {
      // commit a mutation of player State
      commit('updatePosition');

      // dispatch the progress function again
      if (state.sound.playing()) {
        requestAnimationFrame(
          () => dispatch('progress'),
        );
      }
    },

    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      // returning info about current element coordinates in dimensions
      // x - distance from left side of the document to left side of the player
      const { x, width } = payload.currentTarget.getBoundingClientRect();

      // X-coordinate of the click on player timeline (moving thr dot horizontally)
      // Document = 2000, Timeline = 1000, Click = 500, Distance = 500
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      // update the position
      state.sound.seek(seconds);

      // listen the event / callback function will run once
      // dispatch the mutations to player
      state.sound.once('seek',
        () => dispatch('progress'));
    },

  },
  mutations: {
    newSong(state, payload) {
      // update the Song State in the mutation
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    },
  },
};
