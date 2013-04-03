var ncp = require('ncp');
var path = require('path');
var async = require('async');
var _ = require('underscore');
var robot = require('./robot');
var pages = require('./pages');

/**
 * Scratch
 * @param {String} projectPath
 */
module.exports.scratch = function(projectPath) {
  ncp('../skeleton/', projectPath, function(err) {
    if (err) {
      console.error('Scratch quit due to "%s"', err.message);
    }
    else {
      console.log('Scratch finished');
    }
  });
};

/**
 * Compile
 * @param {String} projectPath
 * @param {Object} CLIOpts
 */
module.exports.compile = function(projectPath, CLIOpts) {
  var defaultOpts = require('../defaults.json');
  var localOpts = require(path.join(projectPath, 'robot.json'));
  var opts = _.extend({}, defaultOpts, localOpts, CLIOpts);
  var sourcePath = path.join(projectPath, opts.source);
  var outputPath = path.join(projectPath, opts.output);

  async.series([
    function(step) {
      robot.readSource(sourcePath, step);
    },
    function(step) {
      robot.generateOutput(outputPath, step);
    }
  ],
  function(err) {
    if (err) {
      console.error('Compile quit due to "%s"', err.message);
      process.exit(1);
    }
    else {
      console.log('Compile finished.');
      process.exit();
    }
  });
};