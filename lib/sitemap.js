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
 * Scan folder
 * @param {String} source
 * @param {Function} callback
 */
Sitemap.prototype.scan = function(source, callback) {
    var self = this;

    var walker = walkdir(source);

    walker.on('file', function(file, stats) {
      var ext = path.extname(file);
      var name = path.basename(file, ext);
      var relPath = path.relative(source, file);

      // TODO: ignore glob matches?

      if (self.options.render.indexOf(ext) > -1) {
        self.walkTree(relPath, true);
        self.documents[relPath] = new Document(file, name, ext);
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
Sitemap.prototype.find = function(filter) {
  return _.find(this.documents, function(page) {
    return page.label.search(filter) > -1;
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