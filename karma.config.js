var webpack = require('karma-webpack');

var webpackConfig = require('./webpack.config');

webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(bower_components|node_modules|styles)/,
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    loader: 'ignore-loader'
  }
];

webpackConfig.debug = false;

webpackConfig.module.postLoaders = [{
  test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
  loader: 'istanbul-instrumenter'
}];

module.exports = function (config) {
  config.set({

    browsers: [ 'PhantomJS' ],

    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },

    exclude: [
      '*.css'
    ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests/**/*.spec.js'
    ],

    /**
    * es6-shim this framework provide some es6 features to PhantomJS
    * it's been used because the Object.assign which was creating some problems
    * in PhantomJS
    */
    frameworks: [ 'jasmine', 'es6-shim' ],

    plugins: [
      webpack,
      'karma-es6-shim',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],

    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
      'public/**/*.js': ['webpack']
    },

    reporters: [ 'spec', 'coverage' ],

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      },
      quiet: false
    }
  });
};
