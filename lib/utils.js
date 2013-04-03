/**
 * Queue
 * @constructor
 * @param {Function} callback
 * @param {Integer} length
 */
module.exports.Queue = function(callback, length) {
  var waiting = length || 0;

  this.each = function() {
    waiting--;

    if (!waiting) {
      callback();
    }
  };

  this.wait = function() {
    waiting++;
    return this.each;
  };

  this.done = function() {
    callback();
  };
};