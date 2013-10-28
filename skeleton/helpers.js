/**
 * Repeat
 * @example
 * {{#repeat 3}}...{{/repeat}}
 * @param {Number} count
 * @param {Function} options
 * @returns {String}
 */
exports.repeat = function(count, options) {
  var output = "";

  while (count--) {
    output+= options.fn();
  }

  return output;
};