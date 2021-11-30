<template>
  <div>
    <!-- custom alert message field   -->
    <div v-if="logShowAlert"
         :class="logAlertVariants"
         class="text-white text-center font-bold p-5 mb-4">
      {{ logAlertMessage }}
    </div>
    <VeeForm @submit="login"
             :validation-schema="loginSchema"
    >

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

      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>

        <VeeField name="password"
                  type="password"
                  placeholder="Password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage name="password" class="text-red-600"/>
      </div>

      <!-- Submit button  -->
      <button :disabled="logInSubmission"
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
        Submit
      </button>

    </VeeForm>
  </div>
</template>

<script>

export default {
  name: 'LoginModalForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6|max:32',
      },
      logInSubmission: false,
      logShowAlert: false,
      logAlertVariants: 'bg-blue-500',
      logAlertMessage: 'Please wait',
    };
  },
  methods: {
    login(values) {
      console.log('... login(values) ... :', values);

      this.logShowAlert = true;
      this.logInSubmission = true;

      this.logAlertVariants = 'bg-blue-400';
      this.logAlertMessage = 'Please wait, logging ...';

      this.logAlertVariants = 'bg-green-400';
      this.logAlertMessage = 'Success!';
    },
  },
};
</script>
