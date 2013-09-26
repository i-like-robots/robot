var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var helpers = require('../../lib/robot/helpers.js');

describe('Helpers', function() {

  var mocks = path.join(__dirname, '../mocks/helpers');

  describe('Register helper', function() {

    it('Should register a Handlebars helper', function() {
      helpers.registerHelper('baz', function() {});
      assert.equal(handlebars.helpers.hasOwnProperty('baz'), true);
    });

  });

  describe('Load helpers', function() {

    it('Should load module from given path and register helpers', function() {
      var input = path.join(mocks, 'helpers.js');

      helpers.loadHelpers(input);
      assert.equal(handlebars.helpers.hasOwnProperty('foo'), true);
      assert.equal(handlebars.helpers.hasOwnProperty('bar'), true);
    });

    it('Should remain silent when module cannot be resolved or is invalid', function() {
      var input = path.join(mocks, 'doesnotexist.js');

      assert.doesNotThrow(function() {
          helpers.loadHelpers(input);
      });
    });

  });

});