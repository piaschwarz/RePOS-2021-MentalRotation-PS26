module.exports = {
  performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
  },
  configureWebpack: {    
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    }
  },
  lintOnSave: false,
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {}
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/' + require('./package.json').name + '/'
      : '/'
};
