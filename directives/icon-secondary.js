export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-blue-400 text-2xl`;

    if (binding.value.right) {
      iconClass += ' float-right';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i id="iconDirective" class="${iconClass}"></i>`;
  },
};
