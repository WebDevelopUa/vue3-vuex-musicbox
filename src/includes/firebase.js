// v9 compat packages are API compatible with v8 code
// https://firebase.google.com/docs/web/modular-upgrade

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAy9hdNs8R5e8Zgif1NTOiiAteTP7qkkHg',
  authDomain: 'vue3-vuex-musicbox.firebaseapp.com',
  projectId: 'vue3-vuex-musicbox',
  storageBucket: 'vue3-vuex-musicbox.appspot.com',
  appId: '1:902321016948:web:4d6e82cd909366eeb2c121',
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Auth Service (email, password)
const auth = firebase.auth();

// Firestore Service (name, country, etc.)
const db = firebase.firestore();
const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

// Mp3 file storage on Firebase
const storage = firebase.storage();

// Name exports
export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
};

// export default firebase.initializeApp(firebaseConfig);
