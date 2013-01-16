var path = require('path');
var _ = require('underscore');
var walkdir = require('walkdir');
var Document = require('./document');

/**
 * Sitemap
 * @constructor
 * @param {String} rootPath
 */
var Sitemap = module.exports = function(rootPath) {
  this.tree = [];
  this.documents = {};

  this.pagePath = path.join(rootPath, 'pages');
};

/**
 * Scan Directory
 * @param {Function} callback
 */
Sitemap.prototype.scanDirectory = function(callback) {
  var self = this;
  var walker = walkdir(this.pagePath);

  walker.on('directory', function(file) {
    self.addBranch.apply(self, arguments);
  });

  walker.on('file', function(file) {
    self.addLeaf.apply(self, arguments);
  });

  walker.on('end', callback);
};

/**
 * Add Branch
 * @param {String} file
 */
Sitemap.prototype.addBranch = function(file) {
    this.walkTree(path.relative(this.pagePath, file), true);
};

/**
 * Add Document
 * @param {String} file
 */
Sitemap.prototype.addLeaf = function(file) {
  var ext = path.extname(file);
  var basename = path.basename(file, ext);
  var relative = path.relative(this.pagePath, file);

  // TODO: ignore glob matches
  // TODO: support different text file types
  if (ext === '.html') {
    this.walkTree(relative, true);
    this.documents[relative] = new Document(file, relative, basename, ext);
  }
};

/**
 * Search Tree
 * @param {String|Regex} filter
 * @return {Array}
 */
Sitemap.prototype.searchTree = function(filter) {
  return _.find(this.documents, function(doc) {
    return doc.path.search(filter) > -1;
  });
};

/**
 * Walk Tree
 * @param {Array|String} route
 * @param {Boolean} createRoute
 * @return {Array}
 */
Sitemap.prototype.walkTree = function(route, createRoute) {
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
    else if (createRoute) {
      branch.push({
        label: part,
        nodes: branch = []
      });
    }
  });

  return branch;
};