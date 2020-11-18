// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = coverageIstanbulReporter = {
  dir: require('path').join(__dirname, '../reports/coverage'),
  reports: ['html', 'lcovonly', 'text-summary'],
  fixWebpackSourcePaths: true,
  thresholds: {
    // TODO: 70%
    global: {
      statements: 0.7,
      branches: 0.7,
      functions: 0.7,
      lines: 0.7
    },
    each: {
      statements: 0.7,
      branches: 0.7,
      functions: 0.7,
      lines: 0.7
    }
  },
};
