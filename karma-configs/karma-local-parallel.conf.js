// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const coverageIstanbulReporter = require('./karma-common.conf.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'parallel',
      'jasmine',
      '@angular-devkit/build-angular'
    ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      '@angular-devkit/build-angular/plugins/karma',
      'karma-parallel'
    ],
    parallelOptions: {
      executors: Math.ceil(require('os').cpus().length / 2),
      shardStrategy: 'round-robin'
    },
    client: {
      clearContext: false
    },
    coverageIstanbulReporter,
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });
};
