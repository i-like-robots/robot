/**
 * Document
 * @constructor
 * @param {String} path
 * @param {String} name
 * @param {String} type
 */
var Document = module.exports = function(path, name, type) {
  this.meta = {
    path: path,
    name: name,
    type: type
  };

  return this;
}