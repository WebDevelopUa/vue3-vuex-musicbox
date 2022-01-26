<template>
  <main>

    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
           style="background-image: url(assets/img/header.png)"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis elit.
            Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget,
            ullamcorper urna.
          </p>
        </div>
      </div>

      <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
           src="assets/img/introduction-music.png"
           alt="intro"/>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200" v-icon>
          <span class="card-title">Songs</span>
          <!-- Icon replaced with v-icon directive -->
          <!-- <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>-->
        </div>

        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs"
                    :key="song.docID"
                    :songProp="song"
          />
        </ol>
        <!-- .. end Playlist -->

      </div>
    </section>

  </main>

</template>

<script>

import {
  songsCollection,
} from '@/includes/firebase';
import SongItem from '@/components/SongItem.vue';

export default {
  name: 'Home',
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false,
    };
  },
  async created() {
    //  retrieve the data from Firebase when open Home
    // problematic with huge amount of records
    // solution: implement infinite scroll
    await this.getSongs();

    // detect when the user scrolls the page
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      // in progress ... pending request
      this.pendingRequest = true;

      let snapshots;
      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();
        snapshots = await songsCollection
          .orderBy('modifiedName')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy('modifiedName')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach(
        (document) => this.songs.push({
          docID: document.id,
          ...document.data(),
        }),
      );

      this.pendingRequest = false;
    },
    handleScroll() {
      // offsetHeight = innerHeight + scrollTop properties
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = (Math.round(scrollTop) + innerHeight) === offsetHeight;

      if (bottomOfWindow) {
        // detect when the user scrolled to the bottom of the page
        // BUG in case of browser zooming
        console.log('Bottom of window: ', bottomOfWindow);

        //  init Infinite scrolling
        this.getSongs();
      }
    },
  },
  components: {
    SongItem,
  },

};
</script>
