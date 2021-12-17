<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">

    <!-- Name -->
    <div id="name" v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">
        {{ songProp.modifiedName }}
      </h4>

      <!-- Delete button -->
      <button @click.prevent="deleteSong"
              class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>

      <!-- Edit button -->
      <button @click.prevent="showForm = !showForm"
              class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>

    <!-- Title -->
    <div id="title" v-show="showForm">

      <!-- Alert box -->
      <div class="text-white text-center font-bold p-4 mb-4"
           v-if="showAlert"
           :class="alertVariant"
      >{{ alertMessage }}
      </div>

      <!--  Edit form  -->
      <VeeForm :validation-schema="schema"
               :initial-values="songProp"
               @submit="edit"
      >

        <div class="mb-3">
          <label class="inline-block mb-2">
            Title
          </label>
          <VeeField
            @input="updateUnsavedFlagProp(true)"
            name="modifiedName"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"/>
          <ErrorMessage name="modifiedName" class="text-red-500"/>
        </div>

        <div class="mb-3">
          <label class="inline-block mb-2">
            Genre
          </label>
          <VeeField
            @input="updateUnsavedFlagProp(true)"
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"/>
          <ErrorMessage name="genre" class="text-red-500"/>
        </div>

        <!--  Submit button   -->
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
          Submit
        </button>

        <!-- Go Back button   -->
        <button :disabled="inSubmission"
                @click.prevent="showForm = false"
                type="button"
                class="py-1.5 px-3 rounded text-white bg-gray-600">
          Go Back
        </button>

      </VeeForm>
    </div>

  </div>
</template>

<script>

import {
  songsCollection,
  storage,
} from '@/includes/firebase';

export default {
  name: 'ListItem',
  data() {
    return {
      showForm: false,
      schema: {
        modifiedName: 'required',
        genre: 'alphaSpaces',
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-400',
      alertMessage: 'Please wait, updating info ...',
    };
  },
  methods: {
    async edit(values) {
      console.log('edit(values){}');

      this.inSubmission = true;
      this.showAlert = true;
      this.alertVariant = 'bg-blue-400';
      this.alertMessage = 'Please wait, updating info ...';

      // Firestore DB
      try {
        await songsCollection.doc(this.songProp.docID).update(values);
      } catch (error) {
        this.inSubmission = false;
        this.showAlert = true;
        this.alertVariant = 'bg-red-400';
        this.alertMessage = 'Something went wrong';
        return;
      }

      // update data in parent component
      this.updateSongProp(this.indexProp, values);

      // prevent navigate away / lose changes before submit
      // false - turn the flag off / true - there are unsaved changes
      this.updateUnsavedFlagProp(false);

      this.inSubmission = false;
      this.alertVariant = 'bg-green-400';
      this.alertMessage = 'Success';
    },
    async deleteSong() {
      console.log('Delete song');

      //  reference to the root of the storage
      const storageRef = storage.ref();

      //  reference to the specific file of the storage
      const songRef = storageRef.child(`songs/${this.songProp.originalName}`);

      //  delete item in Firebase Storage
      await songRef.delete();

      //  delete item in Firestore DB / collection
      // select the document of collection
      await songsCollection.doc(this.songProp.docID).delete();

      //  update the list of items in parent component
      this.removeSongProp(this.indexProp);
    },
  },
  props: {
    songProp: {
      type: Object,
      required: true,
    },
    updateSongProp: {
      type: Function,
      required: true,
    },
    removeSongProp: {
      type: Function,
      required: true,
    },
    indexProp: {
      type: Number,
      required: true,
    },
    updateUnsavedFlagProp: {
      type: Function,
    },
  },
};
</script>
