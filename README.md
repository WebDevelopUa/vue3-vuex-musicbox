Vue v3 Music Box Web App
---

### [DEMO](https://vue3-vuex-musicbox.vercel.app)

### [Dashboard](http://localhost:8000/dashboard)

### [PWA manifest](https://vue3-vuex-musicbox.vercel.app/manifest.json)

### [Vue.js devtools 6.0.0 beta 21](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

------------

### Prerequisites:

* [Node.js](https://nodejs.org/) >=16.10
* [Yarn](https://classic.yarnpkg.com/lang/en/) >= 1.22.17
* @vue/cli >= 4.5.15
* [vee-validate v4](https://vee-validate.logaretm.com/v4/guide/components/validation)
* Font Awesome 5.3.1
* tailwindcss/postcss7-compat 2.2.17
* Firebase account, JS SDK_VERSION 9.5.0
* Firebase Storage
* Firebase Authentication
* [Firebase Usage and billing](https://console.firebase.google.com/project/vue3-vuex-musicbox/usage)
* Firestore [DB collections](src/includes/firebase.js): `const db = firebase.firestore();`
    * users: `const usersCollection = db.collection('users');`
    * songs: `const songsCollection = db.collection('songs');`
    * comments: `const commentsCollection = db.collection('comments');`
* [Howler.js](https://howlerjs.com) 2.2.3
* [Vue I18n](https://vue-i18n.intlify.dev) Plugin 2.3.1
* [PWA plugin](https://cli.vuejs.org/ru/core-plugins/pwa.html) 4.5.15
* [lodash](https://lodash.com/docs/) 4.17.15

------------

### Install Yarn

```
npm i yarn --global
yarn --version
```

### ReInstall Vue-cli

```
npm uninstall @vue/cli -g
npm list -g --depth 0
yarn global add @vue/cli
vue --version
```

### Vue UI GUI

```
 vue ui
```

* Ready on [localhost](http://localhost:8000)
* Create new Project or `vue create .`

### Tailwind CSS

* Install Tailwind via Vue UI Plugins: [http://localhost:8000/plugins/add](http://localhost:8000/plugins/add)
  => `vue-cli-plugin-tailwind` => Generate tailwind.config.js => minimal
* [Install Tailwind CSS with Vue](https://tailwindcss.com/docs/guides/vue-3-vite)
* Install Tailwind via npm `npm install -D tailwindcss@latest `

### Vuex - (Vue Plugin)

``` 
yarn add vuex
```

* Vuex Store => src/main.js => `app.use(store)` => src/store/index.js

```js

import {createStore} from 'vuex';

export default createStore({
    state: {
        authModalShow: false,
    },
    mutations: {
        toggleAuthModal: (state) => {
            state.authModalShow = !state.authModalShow;
        },
    },
});


```

* **Access to store state** - `this.$store.state.authModalShow` - is not recommended!
* **Mutations** - changing / updating the state - appears in a form of a function; can be used in any component
* **Map Mutations** - Mappers - extract the mutation function from the store object
* **Getters** - like computed properties - allows accessing state properties from the store; accessible in all
  components; only updates when the state changes; better for performing a calculation on state property
* **Mapping the state** - better for retrieving a state property
* **Alias** - use `modal` as `authModalShow` state property `...mapState({ modal: 'authModalShow', })`

#### Form Validation

* [Documentation](https://ru.vuejs.org/v2/cookbook/form-validation.html)
* [vuelidate](https://github.com/monterail/vuelidate)
* [VeeValidate](https://logaretm.github.io/vee-validate/)

``` 
yarn remove vee-validate --all
yarn cache clean
yarn cache clean --mirror
yarn cache clean --all

yarn add vee-validate@next
yarn add vee-validate/rules
```

or

```
vue ui
```

[http://localhost:8000/dependencies](http://localhost:8000/dependencies) => Install => vee validate
[http://localhost:8000/dependencies](http://localhost:8000/dependencies) => Install => vee validate/rules

Register:

- globally
- locally

> [V4 of vee-validate is for Vue 3 ONLY and has very different API from V3 (which is for Vue 2 ONLY)](https://stackoverflow.com/questions/64663082/install-vee-validate-under-vuejs3-i-got-error)


Trigger validation:

- after the **change** event
- if thr **v-model** directive is applied to an input, when the model is changed
- after the blur event
- after form submission

-------------------------

## Firebase Auth

> Stateless Authentication - the server does not actively keep track of who's logged in;
> a token is used to verify the user instead;
> Vue App send Auth data to Firebase Server; Sever send Token to Local Storage of browser; Vue Send token to Server with every request to Server; Server confirms the user
> DevTools => App => Storage => IndexedDB => firebaseLocalStorageDB => firebaseLocalStorage => {fbase_key: 'x', value: {}}

* [login](https://console.firebase.google.com/)
* Create a project (Step 1 of 3)
* Create Firestore DB
* Start in test mode - (***The default security rules for test mode allow anyone with your database reference to view,
  edit and delete all data in your database for the next 30 days***)

```json5 
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 12, 29);
    }
  }
} 
```

### checks the user is logged in (if UID not null)

```json5 
rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read: if true;
        allow write: if request.auth.uid !=null;
    }
  } 
}
```

* [Rules docs](https://firebase.google.com/docs/rules)
* [Install Firebase SDK Docs](https://firebase.google.com/docs/web/setup) => vue ui => Dependencies => All => firebase
  => Install firebase

```js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAy9hdNs8R5e8Zgif1NTOiiAteTP7qkkHg',
    authDomain: 'vue3-vuex-musicbox.firebaseapp.com',
    projectId: 'vue3-vuex-musicbox',
    storageBucket: 'vue3-vuex-musicbox.appspot.com',
    appId: '1:902321016948:web:4d6e82cd909366eeb2c121',
};

export default firebase.initializeApp(firebaseConfig);

```

* Configure App => [Firebase console](https://console.firebase.google.com/project) => Web => Add Firebase to your web
  app => Register app
* Sidebar => Authentication => Get started => Sign-in method => Email/Password => Enable => Save
* [firebase.auth.Auth docs](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth)
* Modify [RegisterModalForm](src/components/RegisterModalForm.vue) component
* Update SDK 8 to 9 [Docs](https://firebase.google.com/docs/web/modular-upgrade) - `yarn add firebase@9.5.0`

```js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const auth = firebase.auth();
auth.onAuthStateChanged(user => {
    // Check for user status
});
```

#### ERROR:

> POST https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAy9hdNs8R5e8Zgif1NTOiiAteTP7q*** 400

> CHECK POST RESPONSE:

 ```json5 
{
  "error": {
    "code": 400,
    "message": "WEAK_PASSWORD : Password should be at least 6 characters",
    "errors": [
      {
        "message": "WEAK_PASSWORD : Password should be at least 6 characters",
        "domain": "global",
        "reason": "invalid"
      }
    ]
  }
}
```

* **Bucket** - physical location of data storage (limit 1 for free account)
* **Collection** - records in a collection; stored data in db / like categories - separate objects
* **Document** - with generated unique id to track all individual records in a collection; stored data in db / multiple
  Documents can be stored in a single collection

* Sidebar => Authentication => Users => Reload or Add User (email, password)
* Sidebar => Firestore Database => Collection => Document

-------------------------

## Flux pattern

1) Dispatch (Send Data)
2) Action (Business Logic) - function => perform business logic & commit multiple mutations - SYNCHRONOUS & ASYNCHRONOUS
3) Mutation - function => change the state - SYNCHRONOUS
4) State

Actions vs Components

* define logic in **COMPONENTS** if the changes affect the component or its children
* define logic in **ACTIONS** if the changes affect the store/state

## Firebase bind Auth & DB services:

* [firebase.User](https://firebase.google.com/docs/reference/js/v8/firebase.User)

```
uid: string
Inherited from User.uid

The user's unique ID.
```

* save UID to Database
* Firebase SDK store Auth token on a client

DB collections:

* users
* songs

### Reference vs Snapshots

Can read the data in App

* **Reference** - object that points a location in Vue App;
    * allows to read & write multiple references
    * used to manipulate the data in DB
    * used for upload files to the storage & DB
* **Snapshot** - object that is a copy of a location in Vue App;
    * read-only, but are memory efficient
    * immutable - can't be updated
    * used for gathering info about uploading progress
    * can't be created directly
    * created during events

-------------------------

## [Vue Router](https://router.vuejs.org/ru/)

``` 
vue add router

yarn add vue-router

npm install vue-router
```

**_main.js_**

```js 
import router from './router';

app.use(router);
```

**_src/router/index.js_**

``` 
import {createRouter, createWebHistory} from 'vue-router';

const routes = [];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

```

### [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)

**The Full Navigation Resolution Flow**

1. Navigation triggered.
2. Call beforeRouteLeave guards in deactivated components.
3. Call global beforeEach guards.
4. Call beforeRouteUpdate guards in reused components.
5. Call beforeEnter in route configs.
6. Resolve async route components.
7. Call beforeRouteEnter in activated components.
8. Call global beforeResolve guards.
9. Navigation confirmed.
10. Call global afterEach hooks.
11. DOM updates triggered.
12. Call callbacks passed to next in beforeRouteEnter guards with instantiated instances.

[Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)

### Avoiding Dependency Cycle (error)

```js
// a.js
// router/index.js
import b from 'b';
import srore from '@/store';


```

```js 
// b.js
// components/Header.vue
// store/ndex.js
import a from 'a';
import router from '@/router';

export default createStore({
    actions: {

        // #1
        async signOut({commit}) {
            await auth.signOut();
            commit('toggleAuth');

            //  move the logic from Header component to an action
            //  rotuter throw Dependency cycle error
            // (importing route to store & store to route)
            if (this.$route.meta.requiresAuth) {
                this.$router.push({name: 'home'});
            }
        },


        // #2
        async signOut({commit}, payload) {
            await auth.signOut();
            commit('toggleAuth');

            if (payload.meta.requiresAuth) {
                payload.push({name: 'home'});
            }
        },


    },
})

```

```js 
// components/Header.vue

export default {
    methods: {
        //#1
        signOut() {
            this.$store.dispatch('signOut');

            // 1. you can move it to an action (with Dependency cycle error)
            if (this.$route.meta.requiresAuth) {
                this.$router.push({name: 'home'});
            }
        },

        // #2
        signOut() {

            // 2. you can pass router as part of payload to store
            this.$store.dispatch('signOut', {
                router: this.$router,
                route: this.$route,
            });


        }

    }
}
```

### [Dynamic Route Matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html)

Retract the URL, place it like an Object

[router/index.js](src/router/index.js)

```
import Song from '@/views/Song.vue';

  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
```

### Query parameters

* Send additional data to the server through URL
* Vue router supports Query parameters
* Used to save the sorting/filtering order on page reload
* Vue DevTools => Timeline => (CHANGE SORT ORDER) => Router Navigations => Router not reloading component

```
protocol://domain.com/path/pathParams/or/endpoint?queryParams=sort&order=1
```

Path parameters should be used for returning a single resource or multiple resources


-------------------------

## Uploading files to FireStorage

[Free quota](https://firebase.google.com/docs/firestore/quotas)

Firebase => Storage => Songs

> Uncaught TypeError: firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__.default.storage is not a function;  
> fix import path: `import 'firebase/storage';` to `import 'firebase/compat/storage';

Firebase => Storage => [Rules](https://firebase.google.com/docs/storage/security/get-started):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Read - all users; Write - only Auth users - 10mb audio file

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; 
      allow write: if request.auth != null &&
       request.resource.contentType.matches("audio/*") &&
       request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

Publish

```json5
{
  "error": {
    "code": 403,
    "message": "Permission denied."
  }
}
```

``` 
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; 
      allow write: if request.auth != null &&
       request.resource.contentType.matches("audio/mpeg") &&
       request.resource.contentType.matches("video/mp4") &&
       request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

[.matches()](https://firebase.google.com/docs/reference/security/database/regex)

``` 
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; 
      allow write: if request.auth != null &&
       (request.resource.contentType.matches("audio/mpeg") ||
       request.resource.contentType.matches("video/mp4")) &&
       request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

* [Monitor Upload Progress](https://firebase.google.com/docs/storage/web/upload-files)
    * **bytesTransferred**  - Number ?????????? ???????????????????? ????????????, ???????????????????? ?????? ???????????????? ?????????? ?????????????????????????? ????????????.
    * **totalBytes**  - Number ?????????????????? ?????????? ???????????????????? ???????????? ?????? ????????????????.
* [Font Awesome 6 free](https://fontawesome.com/v6.0/icons?q=times&m=free)
    * `<font-awesome-icon icon="fa-solid fa-xmark" />`
    * `<i class="fa-solid fa-xmark"></i>`

-------------------------

### References vs Reactivity

* **Reference** - not reactive - directly access the DOM without updating the Vue Instance; data doesn't change
* **Reactivity** - data changes; Vue instance is updated; Vue updates the template; template gets rendered onto DOM

[Create a Cloud Storage reference on Web](https://firebase.google.com/docs/storage/web/create-reference?hl=uk)    
[Delete files with Cloud Storage on Web](https://firebase.google.com/docs/storage/web/delete-files?hl=uk) using ref:

```js
import {getStorage, ref, deleteObject} from "firebase/storage";

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, 'images/desert.jpg');

// Delete the file
deleteObject(desertRef).then(() => {
    // File deleted successfully
}).catch((error) => {
    // Uh-oh, an error occurred!
});
```

[Structuring Cloud Firestore Security Rules](https://firebase.google.com/docs/firestore/security/rules-structure)
[Change Firebase Storage rules](https://console.firebase.google.com/project/vue3-vuex-musicbox/storage/vue3-vuex-musicbox.appspot.com/rules):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; 
      allow write: if request.auth != null &&
       (request.resource.contentType.matches("audio/mpeg") ||
       request.resource.contentType.matches("video/mp4")) &&
       request.resource.size < 10 * 1024 * 1024;
       allow delete: if request.auth != null;
    }
  }
}
```

-------------------------

## Player

* Store Song in the state - user can listen to the music on all routes
* [Howler.js](https://howlerjs.com) - Check supported audio codecs: "mp3", "mpeg", "opus", "ogg", "oga", "wav", "aac", "
  caf", "m4a", "m4b", "mp4", "  weba", "webm", "dolby", "flac".
* Vue UI => Add new dependency => Howler => Install

#### Update Seek Feature implementing process

1. Edit [Player](src/components/Player.vue) component, add `updateSeek()` listen to click of element:

```vue
<!-- Scrub Container  -->
<span @click.prevent="updateSeek"
      class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer">
</span>
```

2. Define the function in the [Store](src/store/index.js) as an action function, because we'll change the State

```js

export default createStore({
    state: {
        authModalShow: false,
        userLoggedIn: false,
        // init the Song State
        currentSong: {},
        sound: {},
        seek: '00:00',
        duration: '00:00',
        playerProgress: '0%',
    },
    actions: {
        updateSeek({state, dispatch}, payload) {
            if (!state.sound.playing) {
                return;
            }

            // returning info about current element coordinates in dimensions
            // x - distance from left side of the document to left side of the player
            const {x, width} = payload.currentTarget.getBoundingClientRect();

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

    }
});

```

3. Edit [Player](src/components/Player.vue) component, add `updateSeek()` to:

```js

export default {
    name: 'AppPlayer',
    methods: {
        ...mapActions(['toggleAudio', 'updateSeek']),
    },
};

```

-------------------------

## Localization

* install [vue-cli-plugin-i18n plugin](https://www.npmjs.com/package/vue-cli-plugin-i18n)
* restart `vue ui`
* select [Localizations](http://localhost:8000/addon/org.kazupon.vue-i18n/)
* check file [en.json](src/locales/en.json)

```json5
{
  "listen": "Listen to Great Music!"
}
```

-------------------------

## [PWA](https://cli.vuejs.org/ru/core-plugins/pwa.html)

* [Plugins](http://localhost:8000/plugins) => Add => @vue/cli-plugin-pwa
* [Tasks](http://localhost:8000/tasks/) => build
* Open [manifest.json](dist/manifest.json)
* Run [index.html](dist/index.html)

 ```html5

<link rel="manifest" href="/manifest.json">
```

 ```html5

<link rel="manifest" href="./manifest.json">
```

* Browser Dev Tools => App => Manifest
* Browser Dev Tools => Lighthouse => PWA
* [manifest.json](https://vue3-vuex-musicbox.vercel.app/manifest.json)
* [vue.config.js](vue.config.js)

```js 
module.exports = {

    pluginOptions: {
        pwa: {
            name: 'Music Box App',
            themeColor: '#3ae8ff',
            manifestOptions: {
                short_name: 'MusicBox',
            },
        },
    },
};

```

-------------------------

## Caching / Service worker

1. Cache, then Network:
    * Client => Cache => Network => Cache => Client
2. Network, then Cache:
    * Client => Network => Cache => Network => Client
3. [service-worker.js](dist/service-worker.js)
4. [registerServiceWorker.js](src/registerServiceWorker.js)
5. [Workbox](https://developers.google.com/web/tools/workbox)
6. Browser Dev Tools => App => Service Workers
7. Browser Dev Tools => App => Storage => Clear site data
8. Browser Dev Tools => App => Cache Storage
9. Firebase [config](src/includes/firebase.js) => `db.enablePersistence();` (keep copy of DB on a users' browser)

-------------------------

## Optimization

Help Webpack to register global components

1. Create generic Component [base](src/components/base) to store global components
2. Create [Button.vue](src/components/base/GlobalButton.vue)
3. Create [_globals.js](src/includes/_globals.js)
4. Import [main.js](src/main.js) => `import GlobalComponents from './includes/_globals';`
   => `app.use(GlobalComponents);`

#### Perceived Performance

1. Open [song](https://vue3-vuex-musicbox.vercel.app/song/c7EZEZoCX2TpcGRlZEYK)
2. Dev Tools => Network => Slow 3G
3. Edit [Song.vue](src/views/Song.vue), replace:

```javascript
async
created()
{
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();

    if (!docSnapshot.exists) {
        this.$router.push({name: 'home'});
        return;
    }

    // update sort comments using Query params
    const {sort} = this.$route.query;
    this.sort = sort === '1' || sort === '2' ? sort : '1';

    this.song = docSnapshot.data();

    // retrieve comments
    await this.getComments();
}

```

to

```javascript
  async
beforeRouteEnter(to, from, next)
{
    const docSnapshot = await songsCollection.doc(to.params.id).get();

    next((vm) => {
        if (!docSnapshot.exists) {
            vm.$router.push({name: 'home'});
            return;
        }

        const {sort} = vm.$route.query;

        // eslint-disable-next-line no-param-reassign
        vm.sort = sort === '1' || sort === '2' ? sort : '1';

        // eslint-disable-next-line no-param-reassign
        vm.song = docSnapshot.data();
        vm.getComments();
    })
}
```

#### Reduce bundle size / Webpack chunks

1. Vue ui => Task => Analyzer => Chunks
2. Edit router [index.js](src/router/index.js)

```javascript
import Home from '@/views/Home.vue';
import About from '@/views/AboutUs.vue';
import Manage from '@/views/Manage.vue';
import store from '@/store';
import Song from '@/views/Song.vue';
```

3. Load Components if it needed:

```javascript
const Home = () => import( '@/views/Home.vue');
const About = () => import('@/views/AboutUs.vue');
const Manage = () => import('@/views/Manage.vue');
const Song = () => import('@/views/Song.vue');
```

4. Group chunks

```javascript
const Manage = () => import(/* webpackChunkName: "groupedChunk" */'@/views/Manage.vue');
const Song = () => import(/* webpackChunkName: "groupedChunk" */'@/views/Song.vue');
```

5. [NProgress.js](https://ricostacruz.com/nprogress/)

* [Dependencies](http://localhost:8000/dependencies) => Add => NProgress
* [progress-bar.js](src/includes/progress-bar.js)

```javascript
import NProgress from 'nprogress';

export default (router) => {
    router.beforeEach(
        (to, from, next) => {
            NProgress.start();
            next();
        },
    );

    router.afterEach(
        NProgress.done,
    );
};

```

* [main.js](src/main.js)

```javascript
import ProgressBarr from './includes/progress-bar';
import 'nprogress/nprogress.css';

ProgressBarr(router);
```

6. Code coverage tool

* Dev Tools => Console => :... => Coverage => app.js:formatted
* http://localhost:8080/js/app.js

-------------------------
-------------------------

## SEO

* [Search Console](https://search.google.com/search-console/welcome)
* install [vue-meta](https://vue-meta.nuxtjs.org)
* install [vue-meta-3](https://www.tutorialguruji.com/javascript/how-to-use-vue-3-meta-with-vue-js-3/)
    - `yarn add vue-meta@alpha`
* add to `<head>`
  of [index.html](public/index.html): `<meta name="google-site-verification" content="O3EHdQuvpYOlIc90qr3qvIpLhTTKUA8QmDPqsVcm7Ao" />`
* [Install Vue Analytics](https://github.com/MatteoGabriele/vue-gtag-next) - `yarn add vue-gtag-next`
* [Integration](https://marketingplatform.google.com/home/integrations?authuser=0)
* [Add URL](https://search.google.com/search-console/inspect/mobile-usability)
* [Page speed](https://pagespeed.web.dev/report)
* [Custom Title](https://stackoverflow.com/questions/62023604/where-to-find-or-how-to-set-htmlwebpackplugin-options-title-in-project-created-w)

-------------------------

## Stacked Layouts

* [UI components](https://headlessui.dev)
* [heroicons](https://heroicons.com)
* [Dashboard](https://tailwindui.com/components/application-ui/application-shells/stacked)
* [Modal](https://tailwindui.com/components/application-ui/overlays/modals)
* [Create Modal Tutorial](https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component)

-------------------------

* [Vue 3 with Typescript](https://stackoverflow.com/questions/70122887/missing-return-type-on-function-in-vue-3-with-typescript)
* [Vue 3 with Typescript](https://github.com/vuejs/eslint-config-typescript/issues/16)

```js
<script lang="ts">
```

-------------------------

* [emits](https://v3.ru.vuejs.org/ru/guide/migration/emits-option.html)
* [emits](https://v3.ru.vuejs.org/ru/api/options-data.html#emits)
* [Call Parents' Methods](https://dev.to/adnanbabakan/call-parents-methods-in-vue-or-literally-wherever-2i3b)

> Vue 3 ???????????? ?????????????????????????? ?????????? emits, ?????????????? ???? ???????????????????????? ?????????? props.
> ???? ?????????? ???????????????????????? ?????? ???????????????????? ??????????????, ?????????????? ?????????? ???????? ??????????????????????????
> ?????????????????????? ?????? ?????????? ??????????????????.

-------------------------

# musicbox

## Project setup

```

yarn install

```

### Compiles and hot-reloads for development

```

yarn serve

```

### Compiles and minifies for production

```

yarn build

```

### Run your unit tests

```

yarn test:unit

```

### Run your end-to-end tests

```

yarn test:e2e

```

### Lints and fixes files

```

yarn lint

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
