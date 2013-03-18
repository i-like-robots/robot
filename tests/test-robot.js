var path = require('path');
var assert = require('assert');
var Robot = require('../lib/robot');

//
// Test data
//
var testData = {};
testData.skeleton = path.join(__dirname, 'mocks/test-robot/');
testData.default = require('../defaults.json');
testData.local = require(path.join(testData.skeleton, 'robot.json'));
testData.cli = require('./mocks/test-robot/cli.json');

//
// Test suite
//
suite('Robot', function() {

  var instance;

  setup(function() {
    instance = new Robot(testData.skeleton, testData.cli);
  });

  teardown(function() {
    instance = null;
  });

  // Constructor
  suite('Constructor', function() {

    test('Should return an instance of robot', function() {
      assert.ok(instance instanceof Robot);
    });

    test('Should return a new instance of robot', function() {
      var instanceB = new Robot(testData.skeleton);
      assert.notEqual(instance, instanceB);
    });

    test('Should have default skeleton options', function() {
      assert.equal(instance.options.verbose, testData.default.verbose);
    });

    test('Should have mock local options', function() {
      assert.ok(instance.options.local);
    });

    test('Should have mock CLI options', function() {
      assert.ok(instance.options.cli);
    });

  });

});