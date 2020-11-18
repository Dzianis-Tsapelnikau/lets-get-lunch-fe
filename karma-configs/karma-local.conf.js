// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const coverageIstanbulReporter = require('./karma-common.conf.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular'
    ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      '@angular-devkit/build-angular/plugins/karma',
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter,
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
