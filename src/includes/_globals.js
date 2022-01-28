// register this Vue3 plugin before mount App

import _ from 'lodash';

export default {

  // true - Webpack needs to search subdirectories
  install(app) {
    const baseComponents = require.context(
      '../components/base/',
      false,
      /[A-Za-z0-9-_,\s]+\.vue$/i,
    );

    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      );

      // console.log(fileName, componentName);

      // export default
      app.component(
        `Base${componentName}`, componentConfig.default || componentConfig,
      );
    });
  },

};
