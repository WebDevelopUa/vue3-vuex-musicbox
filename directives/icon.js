export default {
  beforeMount(el) {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML += '<i id="iconDirective" class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>';
  },
};
