Vue v3 Music Box Web App
---

### [DEMO](https://vue3-vuex-musicbox.vercel.app)

### [Dashboard](http://localhost:8000/dashboard)

------------

### Prerequisites:

* [Node.js](https://nodejs.org/) >=16.10
* [Yarn](https://classic.yarnpkg.com/lang/en/) >= 1.22.17
* @vue/cli >= 4.5.15
* [vee-validate v4](https://vee-validate.logaretm.com/v4/guide/components/validation)
* Firebase account, JS SDK_VERSION 9.5.0

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
