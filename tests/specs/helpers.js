var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var helpers = require('../../lib/robot/helpers.js');

describe('Helpers', function() {

  var mocks = path.join(__dirname, '../mocks/helpers');

  describe('Register helper', function() {

    it('Should register a Handlebars block helper', function() {
      helpers.registerHelper('baz', function() {
        return 'baz';
      });
      assert.equal(handlebars.helpers.hasOwnProperty('baz'), true);
    });

    it('Should make the block helper available to templates', function() {
      var input = handlebars.compile('{{#repeat 3}}Foo{{/repeat}}');

      helpers.registerHelper('repeat', function(count, options) {
        var output = "";

        while (count--) {
          output+= options.fn();
        }

        return output;
      });

      assert.equal(input(), 'FooFooFoo');
    });

  });

  describe('Load helpers', function() {

    it('Should load helpers module from the given path and register methods as block helpers', function(done) {
      helpers.loadHelpers(mocks, function() {
        assert.equal(handlebars.helpers.hasOwnProperty('foo'), true);
        done();
      });
    });

    it('Should remain silent when helpers module cannot be resolved or is invalid', function(done) {
      var input = path.join(mocks, 'doesnotexist');

      assert.doesNotThrow(function() {
          helpers.loadHelpers(input, new Function);
      });

      done();
    });

  });

});