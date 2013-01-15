var path = require('path');
var nunjucks = require('nunjucks');

var Renderer = module.exports = function(dir) {
  this.env = new nunjucks.Environment([
    new nunjucks.FileSystemLoader( path.join(dir, 'layouts') ),
    new nunjucks.FileSystemLoader( path.join(dir, 'partials') )
  ]);
};

/**
 * Render output
 * @param {String} file
 * @param {Object} data
 * @return {String}
 */
Renderer.prototype.renderOutput = function(file, data) {
  return this.env.render(file, data);
};