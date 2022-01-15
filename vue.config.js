module.exports = {
  configureWebpack: {
    
    config.performance = {
      maxEntrypointSize: 10000000,
      maxAssetSize: 30000000
    }
    
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
