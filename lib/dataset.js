var path = require('path');
var walkdir = require('walkdir');

/**
 * Sitemap
 * @constructor
 * @param {String} rootPath
 */
var Dataset = module.exports = function(rootPath) {
  this.documents = {};
  this.dataPath = path.join(rootPath, 'data');
};

/**
 * Scan Directory
 * @param {Function} callback
 */
Dataset.prototype.scanDirectory = function(callback) {
  var self = this;
  var walker = walkdir(this.dataPath);

  walker.on('file', function(file) {
    self.addDocument.apply(self, arguments);
  });

  walker.on('end', callback);
};

/**
 * Add Document
 * @param {String} file
 */
Dataset.prototype.addDocument = function(file) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);

  if (ext === '.json') {
    this.documents[basename] = require(file);
  }
};