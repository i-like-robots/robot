var fs = require('fs');
var path = require('path');
var async = require('async');
var Walk = require('walkdir');

/**
 * Scan directory
 * @param {String} targetPath
 * @param {Function} callback
 */
exports.scanDirectory = function(targetPath, callback) {
  var files = [];
  var errors = false;
  var walker = new Walk(targetPath);

  walker.on('file', function(path) {
    files.push(path);
  });

  walker.on('error', function() {
    callback(new Error('Path cannot be read'));
    errors = true;
  });

  walker.on('end', function() {
    if (! errors) {
      callback(null, files);
    }
  });
};

/**
 * Filter by file type
 * @param {Array} files
 * @param {Array} allowed
 * @returns {Array}
 */
exports.filterByFileType = function(files, allowed) {
  return files.filter(function(item) {
    return allowed.indexOf(path.extname(item)) >= 0;
  });
};

/**
 * Read files
 * @param {Array} files
 * @param {Function} callbackEach
 * @param {Function} callbackDone
 */
exports.readFiles = function(files, callbackEach, callbackDone) {
  var iterator = function(item, step) {
    fs.readFile(item, 'utf-8', function(err, data) {
      if (! err) {
        callbackEach(item, data);
      }
      step(err);
    });
  };

  async.each(files, iterator, callbackDone);
};