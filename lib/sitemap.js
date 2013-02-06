var path = require('path');
var _ = require('underscore');

/**
 * Sitemap
 * @constructor
 * @param {String} rootPath
 */
var Sitemap = module.exports = function(rootPath) {
  this.tree = [];
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
 * @param {Function} callback
 */
Sitemap.prototype.addLeaf = function(file, callback) {
  this.walkTree(path.relative(this.pagePath, file), true);
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