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
      // Exclude face-api.js source map rules
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: [{ loader: require.resolve('source-map-loader') }],
        exclude: /node_modules[\\/]face-api.js/, 
      });
      return webpackConfig;
    },
  },
};
