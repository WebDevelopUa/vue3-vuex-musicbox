export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-2xl`;

    if (binding.modifiers.right) {
      iconClass += ' float-right';
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    } else {
      iconClass += ' text-green-400';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i id="iconDirective" class="${iconClass}"></i>`;
  },
};
