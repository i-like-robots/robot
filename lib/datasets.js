var path = require('path');
var yaml = require('js-yaml');
var walkdir = require('walkdir');

/**
 * Sitemap
 * @constructor
 * @param {String} rootPath
 */
var Dataset = module.exports = function(rootPath) {
  this.datasets = {};
  this.datasetsPath = path.join(rootPath, 'data');
};

/**
 * Scan Directory
 * @param {Function} callback
 */
Dataset.prototype.scanDirectory = function(callback) {
  var self = this;
  var walker = walkdir(this.datasetsPath);

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
Dataset.prototype.addDocument = function(file, basename) {
  this.datasets[basename] = require(file);
};