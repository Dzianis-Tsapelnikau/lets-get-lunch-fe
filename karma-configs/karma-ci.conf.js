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
      'karma-trx-reporter'
    ],
    client: {
      clearContext: true,
      jasmine: {
        random: false,
      }
    },
    coverageIstanbulReporter,
    reporters: ['progress', 'kjhtml', 'trx'],
    trxReporter: {
      outputFile: require('path').join(__dirname, '../reports/coverage/test-results.trx'),
      shortTestName: false
    },
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    flags: [
      '--disable-web-security',
      '--disable-gpu',
      '--no-sandbox'
    ]
  });
};
