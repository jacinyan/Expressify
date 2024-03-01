const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      };

      webpackConfig.entry = path.resolve(__dirname, 'src', 'index.js');

      return webpackConfig;
    },
  },
};
