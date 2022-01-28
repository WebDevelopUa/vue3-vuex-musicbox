<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">

        <!-- Upload Dropbox -->
        <div
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="isDragOver=false"
          @dragover.prevent.stop="isDragOver = true"
          @dragenter.prevent.stop="isDragOver = true"
          @dragleave.prevent.stop="isDragOver=false"
          @drop.prevent.stop="upload($event)"

          :class="{ 'bg-green-400 border-green-400 border-solid': isDragOver }"
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-green-400 hover:border-green-400 hover:border-solid">
          <h5>Drop your files here</h5>
        </div>

        <!-- Fallback support for uploader -->
        <input
          @change="upload($event)"
          type="file"
          multiple/>

        <hr class="my-6"/>

        <!-- Progress Bars -->
        <div v-for="upload in uploads"
             :key="upload.name"
             class="mb-4">

          <!-- File Name -->
          <div :class="upload.textClass"
               class="font-bold text-sm">
            <i :class="upload.icon"></i>
            {{ upload.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">

            <!-- Inner Progress Bar -->
            <div :style="{ width: upload.currentProgress + '%'}"
                 :class="'bg-blue-400'"
                 class="transition-all progress-bar">

            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

import {
  storage,
  auth,
  songsCollection,
} from '@/includes/firebase';

export default {
  name: 'Upload',
  // isDragOver - pass as data() value (not State), because it used only in current component
  data() {
    return {
      isDragOver: false,
      uploads: [],
    };
  },
  props: ['addSongProp'],
  methods: {
    upload($event) {
      this.isDragOver = false;

      // check is event triggered by Drag&Drop or Input change event
      // converting Object to Array to use Array methods (forEach())
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

      files.forEach(
        (file) => {
          // check if upload file mpeg or mp4
          if ((file.type !== 'audio/mpeg') && (file.type !== 'video/mp4')) {
            console.log('File Type error:', file.type);
            return;
          }

          // check if device is online / reject upload if offline
          if (!navigator.onLine) {
            console.log('reject upload if offline');
            this.uploads.push({
              task: {},
              currentProgress: 100,
              name: file.name,
              variant: 'bg-red-400',
              icon: 'fas fa-times',
              textClass: 'text-red-400',
            });
            return;
          }

          // reference to the storage (firebaseConfig => storageBucket: 'vue3-vuex-musicbox.appspot.com',)
          const storageRef = storage.ref();
          const songsRef = storageRef.child(`songs/${file.name}`);

          // task snapshot object / put() - init upload & return an obj
          const task = songsRef.put(file);

          // create uploads array / object inserted as last index of the array
          const uploadIndex = this.uploads.push({
            task,
            currentProgress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            textClass: '',
          }) - 1;

          // on() - listen the event on the object
          // calculating progress using snapshot object
          task.on('stateChanged',
            (snapshot) => {
              // current upload progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.uploads[uploadIndex].currentProgress = progress;
            },
            (error) => {
              this.uploads[uploadIndex].variant = 'bg-red-400';
              this.uploads[uploadIndex].icon = 'fas fa-times';
              this.uploads[uploadIndex].textClass = 'text-red-400';

              console.log(error);
            },
            async () => {
              // song object lets us know who upload the file
              const song = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                originalName: task.snapshot.ref.name,
                modifiedName: task.snapshot.ref.name,
                genre: '',
                commentCount: 0,
              };

              // URL to the file
              song.url = await task.snapshot.ref.getDownloadURL();

              // add song object to songs collection DB
              // return the document reference / need to pass it to Manage component to update the list of items on Success upload
              const songRef = await songsCollection.add(song);

              // Callback function from parent component / push the data to songs array in Manage
              // Uncaught (in promise) TypeError: document.data is not a function / because we're storing the document in var
              // this.addSongProp(songRef);

              // expecting snapshot / not a reference
              const songSnapshot = await songRef.get();
              this.addSongProp(songSnapshot);

              this.uploads[uploadIndex].variant = 'bg-green-400';
              this.uploads[uploadIndex].icon = 'fas fa-check';
              this.uploads[uploadIndex].textClass = 'text-green-400';

              console.log('Uploaded!');
            });

          console.log('uploading ...');
        },
      );

      // console.log('... upload($event) ... :', $event);
      // console.log('... files Object... :', $event.dataTransfer.files);
      // console.log('... files Array... :', files);
    },
    cancelUploads() {
      console.log('2) cancelUploads()');
      // 2) cancel upload using Navigation Guard and references
      this.uploads.forEach(
        (upload) => {
          console.log('cancel upload 2');
          upload.task.cancel();
        },
      );
    },
  },
  beforeUnmount() {
    console.log('1) cancel upload beforeUnmount()');
    // 1) cancel upload before the component unmounted / switch to another page
    this.uploads.forEach(
      (upload) => {
        console.log('cancel upload 1');
        upload.task.cancel();
      },
    );
  },
};
</script>
