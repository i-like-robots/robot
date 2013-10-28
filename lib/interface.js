var path = require('path');
var fs = require('fs-extra');
var async = require('async');
var Options = require('./robot/options');
var helpers = require('./robot/helpers');
var processes = require('./robot/processes');

/**
 * Scratch
 * @param {String} target
 */
module.exports.scratch = function(target) {
  var source = path.join(__dirname, '../skeleton/');

  fs.mkdirs(target, function(err) {
    if (err) {
      console.error('Target directory could not be created');
      process.exit(1);
    }
    else {
      fs.copy(source, target, function(err) {
        if (err) {
          console.error('Project skeleton could not be copied, Error %s', Array.isArray(err) ? err.pop().errno : err.errno);
          process.exit(1);
        }
        else {
          console.log('Project skeleton copied to %s', target);
          process.exit();
        }
      });
    }
  });

};

/**
 * Compile
 * @param {String} target
 * @param {Object} userOptions
 */
module.exports.compile = function(target, userOptions) {
  var options = new Options(target, userOptions);

  async.waterfall([
    function(step) {
      helpers.loadHelpers(target, step);
    },
    function(step) {
      processes.readResources(options.sourcePath, step);
    },
    function(resources, step) {
      processes.writeOutput(options.outputPath, resources, step);
    },
    function(step) {
      processes.appendIncludes(options.sourcePath, options.outputPath, options.append, step);
    }
  ],
  function(err) {
    if (err) {
      console.error('Compile quit due to "%s"', err.message);
      process.exit(1);
    }
    else {
      console.log('Compile finished');
      process.exit();
    }
  });
};