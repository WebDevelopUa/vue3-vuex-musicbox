<template>
  <main>

    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
           style="background-image: url(/assets/img/song-header.png)">
      </div>
      <div class="container mx-auto flex items-center">

        <!-- Play/Pause Button -->
        <!-- map newSong(song) action -->
        <button @click.prevent="newSong(song)"
                type="button"
                class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none">
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">

          <!-- Song Info -->
          <div class="text-3xl font-bold">
            {{ song.modifiedName }}
          </div>
          <div>
            {{ song.genre }}
          </div>
          <div class="song-price">
            {{ $n(1, 'currency', 'ja') }}
          </div>

        </div>
      </div>
    </section>

    <!-- Form section -->
    <section id="comments" class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">

        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            Comments ({{ song.commentCount }})
            <span class="text-gray-400">| Translation: </span>
            {{ $tc('song.commentCount', song.commentCount, {count: song.commentCount}) }}
          </span>
          <small class="text-orange"> <i> ... Please, login to leave the comment</i></small>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>

        <div class="p-6">

          <!--  Info message  -->
          <div v-if="commentShowAlert"
               :class="commentAlertVariant"
               class="text-white text-center font-bold p-4 mb-4">
            {{ commentAlertMessage }}
          </div>

          <!--  FORM is visible only for Auth users -->
          <VeeForm
            v-if="userLoggedIn"
            @submit="addComment"
            :validation-schema="schema">
            <VeeField as="textarea"
                      name="comment"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                      placeholder="Your comment here...">
            </VeeField>
            <ErrorMessage name="comment" class="text-red-600"/>

            <button :disabled="commentInSubmission"
                    type="submit"
                    class="py-1.5 px-3 rounded text-white bg-green-600 block">
              Submit
            </button>
          </VeeForm>

          <!-- Sort Comments using Query params -->
          <!-- using watchers -->
          <select v-model="sort"
                  class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>

        </div>
      </div>
    </section>

    <!-- Comments Sorted array -->
    <ul class="container mx-auto">
      <li v-for="comment in sortedComments"
          :key="comment.docID"
          class="p-6 bg-gray-50 border border-gray-200">

        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">
            {{ comment.name }}
          </div>
          <time>
            {{ comment.datePosted }}
          </time>
        </div>

        <p>
          {{ comment.content }}
        </p>

      </li>
    </ul>

  </main>
</template>

<script>

import {
  mapState,
  mapActions,
} from 'vuex';
import {
  songsCollection,
  auth,
  commentsCollection,
} from '@/includes/firebase';

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: 'bg-blue-500',
      commentAlertMessage: 'Please wait, comment is been submitted',
      comments: [],
      sort: '1',
    };
  },
  computed: {
    ...mapState(['userLoggedIn']),
    sortedComments() {
      // slice() creates new array (copy) to sort()
      return this.comments.slice().sort(
        (a, b) => {
          if (this.sort === '1') {
            return new Date(b.datePosted) - new Date(a.datePosted);
          }

          return new Date(a.datePosted) - new Date(b.datePosted);
        },
      );
    },
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();

    if (!docSnapshot.exists) {
      this.$router.push({ name: 'home' });
      return;
    }

    // update sort comments using Query params
    const { sort } = this.$route.query;
    this.sort = sort === '1' || sort === '2' ? sort : '1';

    this.song = docSnapshot.data();

    // retrieve comments
    await this.getComments();
  },
  methods: {
    // map newSong(song) action from the store
    ...mapActions(['newSong']),
    async addComment(values, { resetForm }) {
      this.commentShowAlert = true;
      this.commentInSubmission = true;
      this.commentAlertVariant = 'bg-blue-500';
      this.commentAlertMessage = 'Please wait, comment is been submitted';

      // add comments to Firestore DB
      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      // increment comments / stored in Firestore DB
      this.song.commentCount += 1;
      await songsCollection.doc(this.$route.params.id).update({
        commentCount: this.song.commentCount,
      });

      // retrieve comments
      await this.getComments();

      this.commentInSubmission = true;
      this.commentAlertVariant = 'bg-green-500';
      this.commentAlertMessage = 'Comment added';

      resetForm();

      console.log(' async addComment(values): ', values);
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where('sid', '==', this.$route.params.id)
        .get();

      this.comments = [];

      snapshots.forEach(
        (doc) => this.comments.push({
          docID: doc.id,
          ...doc.data(),
        }),
      );
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
