<template>
  <div>
    <!-- custom alert message field   -->
    <div v-if="regShowAlert"
         :class="regAlertVariants"
         class="text-white text-center font-bold p-5 mb-4">
      {{ regAlertMessage }}
    </div>
    <VeeForm :validation-schema="regSchema"
             @submit="register"
             :initial-values="userData"
    >

      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <VeeField type="text"
                  name="name"
                  placeholder="Enter Name"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage name="name" class="text-red-600"/>
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <VeeField name="email"
                  type="email"
                  placeholder="Enter Email"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        />
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
            type="password"
            v-bind="field"
            placeholder="Password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
          />
          <div class="text-red-300" v-for="error in errors" :key="error">
            {{ error }}
          </div>
        </VeeField>
        <ErrorMessage name="password" class="text-red-600"/>
      </div>

      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <VeeField name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        />
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
</template>

<script>

// @ - path from the 'src'
import { auth, usersCollection } from '@/includes/firebase';

export default {
  name: 'RegisterModalForm',
  data() {
    return {
      regSchema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue:100',
        password: 'required|min:6|max:100',
        confirmPassword: 'passwordMismatch:@password',
        country: 'required|countryExcluded:Forbidden',
        tos: 'tos',
        // confirmPassword: 'confirmed:@password',
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
  methods: {
    async register(values) {
      console.log('... register(values) ... :', values);

      this.regShowAlert = true;
      this.regInSubmission = true;

      this.regAlertVariants = 'bg-blue-400';
      this.regAlertMessage = 'Please wait, your account is being created';

      let userCredentials = null;
      try {
        userCredentials = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password,
        );
      } catch (error) {
        this.regInSubmission = false;
        this.regAlertVariants = 'bg-red-500';
        this.regAlertMessage = 'Something went wrong';
        return;
      }

      try {
        console.log('try', values.name);

        await usersCollection.add({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
        });
      } catch (error) {
        console.log('catch', error);

        this.regInSubmission = false;
        this.regAlertVariants = 'bg-red-500';
        this.regAlertMessage = 'Something went wrong';
        return;
      }

      this.regAlertVariants = 'bg-green-300';
      this.regAlertMessage = 'Success, your account has been created';

      console.log(userCredentials);
    },
  },
};
</script>
