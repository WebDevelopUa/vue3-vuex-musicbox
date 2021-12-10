<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">

      <!-- Uploading files -->
      <!-- Attach reference property to cancel upload using Navigation Guard and references  -->
      <AppUpload ref="upload"
                 :addSongProp="addSong"
      />
      <!-- ./Uploading files -->

      <!-- Music list -->
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">

            <!-- Composition Items -->
            <ListItem v-for="(song, i) in songs"
                      :key="song.docID"
                      :songProp="song"
                      :updateSongProp="updateSong"
                      :indexProp="i"
                      :removeSongProp="removeSong"
                      :updateUnsavedFlagProp="updateUnsavedFlag"
            />

          </div>
        </div>
      </div>
      <!-- ./Music list -->

    </div>
  </section>

</template>

<script>

// import store from '@/store';

import AppUpload from '@/components/Upload.vue';
import ListItem from '@/components/ListItem.vue';
import { songsCollection, auth } from '@/includes/firebase';

export default {
  name: 'Manage',
  components: { ListItem, AppUpload },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  methods: {
    // updates the data (ListItem form values after submit) in Manage component
    // pass it down to ListItem component
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  async created() {
    //  retrieve the data from DB before the component gets loaded on the page
    // asynchronous request data from DB / querying the documents (objects) / chaining by get() - return Snapshot
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

    snapshot.forEach(this.addSong);
  },
  beforeRouteLeave(to, from, next) {
    // prevent navigate away / lose changes before submit
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You want to leave?');
      next(leave);
    }

    // 2) cancel upload using Navigation Guard and references
    // this.$refs.upload.cancelUploads();
    // next();
  },
  // move this logic to the global level
  // // (used for only this component) method runs before component render (Navigation Guards)
  // beforeRouteEnter(to, from, next) {
  //   console.log('... beforeRouteEnter(to,from,next) ... store.state.userLoggedIn: ', store.state.userLoggedIn);
  //   if (store.state.userLoggedIn) {
  //     // render Manage page when user is logged in
  //     next();
  //   } else {
  //     // redirect to Homepage when user is NOT logged in
  //     next({ name: 'home' });
  //   }
  // },

};
</script>
