const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],
  configureWebpack: {
    plugins: [
    ]
  }
});
