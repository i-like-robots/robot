var fs = require('fs');
var assert = require('assert');
var Robot = require('../lib/robot');

var source = __dirname + '/../skeleton/';
var temp = __dirname + '/temp/';
var config = {
  default: require('../default.config.json'),
  local: require('../skeleton/config.json'),
  test: require('./test-data/config.json')
};

suite('Robot', function() {

  var instance;

  setup(function() {
    instance = new Robot(source, config.test);
  });

  teardown(function() {
    instance = null;
  });

  //
  // Constructor
  //
  suite('Constructor', function() {

    test('Should return an instance of robot', function() {
      assert.ok(instance instanceof Robot);
    });

    test('Should return a new instance of robot', function() {
      var instanceB = new Robot(source);
      assert.notEqual(instance, instanceB);
    });

    test('Should have default.config.json options', function() {
      assert.equal(instance.options.verbose, config.default.verbose);
    });

    test('Should have local config.json options', function() {
      assert.equal(instance.options.source, config.local.source);
    });

    test('Should have test.config.json options', function() {
      assert.equal(instance.options.output, config.test.output);
    });

  });

});