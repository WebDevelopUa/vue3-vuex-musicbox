Vue v3 Music Box Web App
---

### [DEMO](https://vue3-vuex-musicbox.vercel.app)

### [Dashboard](http://localhost:8000/dashboard)

------------

### Prerequisites:

* [Node.js](https://nodejs.org/) >=16.10
* [Yarn](https://classic.yarnpkg.com/lang/en/) >= 1.22.17
* @vue/cli >= l4.5.15

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

* Access to store state - `this.$store.state.authModalShow` - is not recommended!
* Mutations - changing / updating the state - appears in a form of a function; can be used in any component
* Map Mutations - Mappers - extract the mutation function from the store object
* Getters - like computed properties - allows accessing state properties from the store; accessible in all components;
  only updates when the state changes; help with a performance

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
