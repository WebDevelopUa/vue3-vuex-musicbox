<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">

    <!-- Name -->
    <div id="name" v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">
        {{ songProp.modifiedName }}
      </h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>
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
          <VeeField type="text"
                    name="modifiedName"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Song Title"/>
          <ErrorMessage name="modifiedName" class="text-red-500"/>
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">
            Genre
          </label>
          <VeeField name="genre"
                    type="text"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Genre"/>
          <ErrorMessage name="genre" class="text-red-500"/>
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
          Submit
        </button>
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

import { songsCollection } from '@/includes/firebase';

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
      this.updateSongCallBack(this.indexProp, values);

      this.inSubmission = false;
      this.alertVariant = 'bg-green-400';
      this.alertMessage = 'Success';
    },
  },
  props: {
    songProp: {
      type: Object,
      required: true,
    },
    updateSongCallBack: {
      type: Function,
      required: true,
    },
    indexProp: {
      type: Number,
      required: true,
    },
  },
};
</script>
