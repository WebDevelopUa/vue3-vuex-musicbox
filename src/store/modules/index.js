// Automates module registration

import {
  camelCase,
} from 'lodash';

const requireModule = require.context(
  '.',
  false,
  /\.js$/,
);

const modules = {};

// exclude files from registration (will be registered on About page)
requireModule.keys().forEach((fileName) => {
  console.log('requireModule fileName', fileName);
  if (fileName === './index.js' || fileName === './about.js') {
    return;
  }

  const moduleConfig = requireModule(fileName);
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;
