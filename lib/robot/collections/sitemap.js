/**
 * Sitemap
 * @constructor
 */
var Sitemap = module.exports = function() {
  this._tree = [];
};

/**
 * Add page
 * @param   {String} path
 * @returns {Array}
 */
Sitemap.prototype.addPage = function(path) {

  var route = path.split('/');
  var root = this._tree;
  var branch;

  route.forEach(function(component) {

    // TODO: Replace with .find() when ES6 is finalised
    var existing = root.filter(function(item) {
      return component === item.id
    });

    if (existing.length) {
      branch = existing.pop();
      root = branch.children;
    }
    else {
      branch = {
        id: component,
        children: []
      };

      root.push(branch);

      root = branch.children;
    }

  });

  return branch;
};
