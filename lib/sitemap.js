var path = require('path');
var _ = require('underscore');
var walkdir = require('walkdir');
var Document = require('./document');

/**
 * Sitemap
 * @constructor
 * @param {String} source
 */
var Sitemap = module.exports = function(options) {
  this.tree = [];
  this.documents = {};
  this.options = options;
};

/**
 * Scan directory
 * @param {String} source
 * @param {Function} callback
 */
Sitemap.prototype.scan = function(source, callback) {
    var self = this;

    var walker = walkdir(source);

    walker.on('file', function(file, stats) {
      var ext = path.extname(file);
      var basename = path.basename(file, ext);
      var relative = path.relative(source, file);

      // TODO: ignore glob matches?

      if (self.options.render.indexOf(ext) > -1) {
        self.walkTree(relative, true);
        self.documents[relative] = new Document(file, relative, basename, ext);
      }
    });

    walker.on('directory', function(dir, stats) {
      self.walkTree(path.relative(source, dir), true);
    });

    walker.on('end', callback);
};

/**
 * Find document
 * @param {String|Regex} filter
 * @return {Array}
 */
Sitemap.prototype.findDocument = function(filter) {
  return _.find(this.documents, function(doc) {
    return doc.path.search(filter) > -1;
  });
};

/**
 * Walk tree
 * @param {Array|String} route
 * @param {Boolean} create
 * @return {Array}
 */
Sitemap.prototype.walkTree = function(route, create) {

  var branch = this.tree;

  if (typeof route === 'string') {
    route = route.split('/');
  }

  route.forEach(function(part) {
    if (branch.nodes) {
      branch = branch.nodes;
    }

    var twig = _.find(branch, function(leaf) {
      return leaf.label === part;
    });

    if (twig) {
      branch = twig.nodes;
    }
    else if (create) {
      branch.push({
        label: part,
        nodes: branch = []
      });
    }
  });

  return branch;
};