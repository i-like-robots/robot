/**
 * Sitemap
 * @constructor
 */
var Sitemap = module.exports = function() {
  this._tree = [];
};

/**
 * Traverse
 * @param   {String} path
 * @param   {Any} payload
 * @returns {Object|Null}
 */
Sitemap.prototype.traverse = function(path, payload) {

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
    else if (payload) {
      branch = {
        id: component,
        data: payload,
        children: []
      };

      root.push(branch);

      root = branch.children;
    }
    else {
      branch = null;
    }

  });

  return branch;
};
