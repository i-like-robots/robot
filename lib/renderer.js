var fs = require('fs');
var path = require('path');

var _ = require('underscore');
var nunjucks = require('nunjucks');

var Renderer = module.exports = function(dir) {
  this.env = new nunjucks.Environment([
    new nunjucks.FileSystemLoader( path.join(dir, 'layouts') ),
    new nunjucks.FileSystemLoader( path.join(dir, 'partials') )
  ]);
};

/**
 * Write
 * @param {Object} template
 * @param {Object} data
 * @return {String}
 */
Renderer.prototype.render = function(template, data) {
  return this.env.render(template, data);
};

/**
 * Save
 * @param {String} filepath
 * @param {String} buffer
 * @param {Function} callback
 */
Renderer.prototype.save = function(filepath, buffer, callback) {
  var dir = path.dirname(filepath);

  function writeFile() {
    fs.writeFile(filepath, buffer, callback);
  }

  fs.exists(dir, function(exists) {
    if (exists) {
      writeFile();
    }
    else {
      fs.mkdir(dir, function(err) {
        if (err) {
          // TODO: throw
        }

        writeFile();
      })
    }
  });
};