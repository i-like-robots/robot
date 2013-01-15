/**
 * Document
 * @constructor
 * @param {String} file
 * @param {String} path
 * @param {String} name
 * @param {String} type
 */
var Document = module.exports = function(file, path, name, type) {
  this.meta = {
    file: file,
    path: path,
    name: name,
    type: type
  };

  return this;
}