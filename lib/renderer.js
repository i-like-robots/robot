var path = require('path');
var nunjucks = require('nunjucks');

/**
 * Renderer
 * @constructor
 * @param {String} rootPath
 */
var Renderer = module.exports = function(rootPath) {
  this.env = new nunjucks.Environment([
    new nunjucks.FileSystemLoader(path.join(rootPath, 'layouts')),
    new nunjucks.FileSystemLoader(path.join(rootPath, 'partials'))
  ]);
};

/**
 * Render Template
 * @param {String} file
 * @param {Object} data
 * @return {String}
 */
Renderer.prototype.renderTemplate = function(file, data) {
  return this.env.render(file, data);
};