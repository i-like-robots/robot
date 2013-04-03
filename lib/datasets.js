var path = require('path');
var yaml = require('js-yaml');
var walkdir = require('walkdir');

/**
 * Data sets
 * @type {Object}
 */
exports.datasets = {};

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
      self.addDocument.call(self, file, basename);
    }
  });

  walker.on('end', callback);
};

/**
 * Add Document
 * @param {String} file
 * @param {String} basename
 */
exports.addDocument = function(file, basename) {
  this.datasets[basename] = require(file);
};