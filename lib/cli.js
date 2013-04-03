var ncp = require('ncp');
var path = require('path');
var _ = require('underscore');
var robot = require('./robot');

/**
 * Scratch
 * @param {String} projectPath
 */
module.exports.scratch = function(projectPath) {
  ncp('../skeleton/', projectPath, function(err) {
    if (err) {
      console.error('Unable to copy skeleton "%s"', err.message);
    }
    else {
      console.log('Project skeleton copied to %s', projectPath);
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

  robot.readSource(sourcePath, function() {
    console.log('Source read from %s', sourcePath);
    robot.generateOutput(outputPath, function() {
      console.log('Output written to %s', outputPath);
    });
  });
};