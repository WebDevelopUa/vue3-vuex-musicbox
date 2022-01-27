module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Music Box - Vue3 App',
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
};
