var async = require('async');
var resources = require('./resources');

/**
 * Read resources
 * @param {String} root
 * @param {Function} callback
 */
exports.readResources = function(root, callback) {
  async.series([
    function(step) {
      resources.scanData(root, function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadData(files, step);
        }
      });
    },
    function(step) {
      resources.scanPartials(root, function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadPartials(files, step);
        }
      });
    },
    function(step) {
      resources.scanLayouts(root, function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadLayouts(files, step);
        }
      });
    },
    function(step) {
      resources.scanPages(root, function(err, files) {
        if (err) {
          step(err);
        }
        else {
          resources.loadPages(files, step);
        }
      });
    }
  ], callback);
};

/**
 * Write output
 * @param {Object} data
 * @param {Function} callback
 */
exports.writeOutput = function(data, callback) {
};