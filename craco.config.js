const CracoLessPlugin = require('craco-less');
const CracoEnvPlugin = require('craco-plugin-env');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#00539C' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {}
      }
    }
  ],
};
