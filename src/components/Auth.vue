<template>
  <!-- Modal window class 'hidden' -->
  <!--  :class="{hidden: !authModalShow}"-->
  <div class="fixed z-10 inset-0 overflow-y-auto"
       :class="{hidden: !modal}"
       id="modal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>

            <!-- Modal Close Button class 'modal-close' contain close button -->
            <div class="modal-close cursor-pointer z-50"
                 @click.prevent="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <!--  use data() to switch between 'login' and 'register' forms        -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition"
                 href="#"
                 @click.prevent="tab = 'login'"
                 :class="{
                   'hover:text-white text-white bg-blue-600' : tab === 'login',
                   'hover:text-blue-600' : tab === 'register'
                 }"
              >Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition"
                 href="#"
                 @click.prevent="tab = 'register'"
                 :class="{
                   'hover:text-white text-white bg-blue-600' : tab === 'register',
                   'hover:text-blue-600' : tab === 'login'
                 }"
              >Register</a>
            </li>
          </ul>

          <!-- #1 Login Form -->
          <form v-show="tab === 'login'">

            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <input type="email"
                     class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                     placeholder="Enter Email"/>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input type="password"
                     class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                     placeholder="Password"/>
            </div>
            <button type="submit"
                    class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </form>

          <!-- #2 Registration Form (vee-validated) -->
          <!-- custom alert message field   -->
          <div v-if="regShowAlert"
               :class="regAlertVariants"
               class="text-white text-center font-bold p-5 mb-4">
            {{ regAlertMessage }}
          </div>
          <VeeForm v-show="tab === 'register'"
                   :validation-schema="schema"
                   @submit="register"
                   :initial-values="userData"
          >

            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <VeeField type="text"
                        name="name"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Name"
              />
              <ErrorMessage name="name" class="text-red-600"/>
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField name="email"
                        type="email"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Email"/>
              <ErrorMessage name="email" class="text-red-600"/>
            </div>

            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <VeeField name="age"
                        type="number"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"/>
              <ErrorMessage name="age" class="text-red-600"/>
            </div>

            <!-- Password -->
            <!-- output multiple errors at once in case of: if Password invalid - Confirm password invalid too -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <!-- :bails="false" not to use extra strategy -->
              <VeeField :bails="false"
                        v-slot="{field, errors}"
                        name="password">
                <input
                  type="password" v-bind="field"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password"/>
                <div class="text-red-300" v-for="error in errors" :key="error">
                  {{ error }}
                </div>
              </VeeField>

              <ErrorMessage name="password" class="text-red-600"/>
            </div>

            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <VeeField name="confirm_password"
                        type="password"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Confirm Password"/>
              <ErrorMessage name="confirmPassword" class="text-red-600"/>
            </div>

            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <VeeField as="select"
                        name="country"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="Brazil">Brazil</option>
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Forbidden">Forbidden</option>
              </VeeField>

              <ErrorMessage name="country" class="text-red-600"/>
            </div>

            <!-- Terms of Services -->
            <div class="mb-3 pl-6">
              <VeeField name="tos"
                        value="1"
                        type="checkbox"
                        class="w-4 h-4 float-left -ml-6 mt-1 rounded"/>
              <label class="inline-block">Accept terms of service</label>
              <ErrorMessage name="tos" class="text-red-600 block"/>
            </div>

            <!-- Submit button  -->
            <button :disabled="regInSubmission"
                    type="submit"
                    class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>

          </VeeForm>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      tab: ['login', 'register'],
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue:100',
        password: 'required|min:3|max:100',
        confirm_password: 'passwordMismatch:@password',
        country: 'required|countryExcluded:Forbidden',
        tos: 'tos',
        // confirm_password: 'confirmed:@password',
        // country: 'required|forbidden:Forbidden',
        // tos: 'required',
      },
      userData: {
        country: 'Brazil',
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariants: 'bg-blue-500',
      regAlertMessage: 'Please wait, your account is being created',
    };
  },
  computed: {
    // replaced with 'mapState' from vuex
    // authModalShow() {
    //   return this.$store.getters.authModalShow;
    // },

    // replaced with alias 'modal'
    // ...mapState(['authModalShow']),

    ...mapState({
      modal: 'authModalShow',
    }),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    // no 'v-model' to bind values of inputs fields, vee-validate instead
    register(values) {
      console.log('... register(values) ... :', values);

      this.regShowAlert = true;
      this.regInSubmission = true;

      this.regAlertVariants = 'bg-blue-400';
      this.regAlertMessage = 'Please wait, your account is being created';

      this.regAlertVariants = 'bg-green-200';
      this.regAlertMessage = 'Success, your account has been created';
    },
  },
};
</script>
