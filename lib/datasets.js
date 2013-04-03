var path = require('path');
var yaml = require('js-yaml');
var walkdir = require('walkdir');

/**
 * Data sets
 * @type {Object}
 */
exports.datasets = {};

/**
 * Errors
 * @type {Object}
 */
exports.errors = {};

/**
 * Scan Directory
 * @param {String} rootPath
 * @param {Function} callback
 */
exports.scanDirectory = function(rootPath, callback) {
  var self = this;
  var walker = walkdir(path.join(rootPath, 'data'));

  walker.on('file', function(file) {
    var ext = path.extname(file);
    var basename = path.basename(file, ext);

    if (['.json', '.js', '.yaml', '.yml'].indexOf(ext) >= 0) {
      var err = self.addDocument.call(self, file, basename);

      // Log error but carry on
      if (err) {
        console.error('Error reading %s', path.relative(rootPath, file));
      }
    }
  });

  walker.on('end', callback);
};

/**
 * Add Document
 * @param {String} file
 * @param {String} basename
 * @return {Object|Error}
 */
exports.addDocument = function(file, basename) {
  try {
    this.datasets[basename] = require(file);
  }
  catch(err) {
    return err;
  }

  return;
};