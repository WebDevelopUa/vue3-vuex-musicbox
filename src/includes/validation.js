// configure function allow to override the default messages from a global validators
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as forbidden,
} from '@vee-validate/rules';

export default {
  install(app) {
    // register components globally
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    // register vee-validate rules globally
    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('minValue', minValue);
    defineRule('maxValue', maxValue);
    defineRule('confirmed', confirmed);
    defineRule('forbidden', forbidden);
    defineRule('countryExcluded', forbidden);
    defineRule('passwordMismatch', confirmed);
    defineRule('tos', required);

    // customize error messages from global rules
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is to short`,
          max: `The field ${ctx.field} is to long`,
          alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          minValue: `The field ${ctx.field} is too low`,
          maxValue: `The field ${ctx.field} is too high`,
          forbidden: `You are not allowed to use this value for the field ${ctx.field}`,
          countryExcluded: 'We do not accept users from this location',
          passwordMismatch: 'The password don\'t match',
          tos: 'You must accept the Terms of Service',
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
