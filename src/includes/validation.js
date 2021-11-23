// import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import { Form, Field } from 'vee-validate';

export default {
  install(app) {
    // app.component('VeeForm', VeeForm);
    app.component('VeeForm', Form);
    // app.component('VeeField', VeeField);
    app.component('VeeField', Field);
  },
};
