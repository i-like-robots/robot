var path = require('path');
var walkdir = require('walkdir');

/**
 * Sitemap
 * @constructor
 * @param {String} source
 */
var Dataset = module.exports = function(options) {
  this.documents = {};
};

/**
 * Scan folder
 * @param {String} source
 * @param {Function} callback
 */
Dataset.prototype.scan = function(source, callback) {
    var self = this;
    var walker = walkdir(source);

    walker.on('file', function(file, stats) {
      var ext = path.extname(file);
      var basename = path.basename(file, ext);

      if (ext === '.json') {
        self.documents[basename] = require(file);
      }
    });

    walker.on('end', callback);
};