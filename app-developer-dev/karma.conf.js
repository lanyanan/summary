// Karma configuration
// Generated on Tue Nov 24 2015 17:52:47 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
        'test/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        'karma.conf.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // 'test/**/*.js' : ['browserify', 'coverage']
        'test/unit/**/*.js' : ['browserify']
    },

    plugins: [
        'karma-jasmine',
        'karma-chrome-launcher',
        // 'karma-coverage',
        require('karma-browserify'),
        require('karma-htmlfilealt-reporter')
    ],

    browserify: {
      debug: true,
      transform: ['reactify'],
      extensions: ['.js', '.jsx']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'htmlalt'],
    // reporters: ['progress','coverage'],

    htmlReporter: {
      outputFile: 'test/units.html',
            
      // Optional 
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
