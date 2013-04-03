var path = require('path');
var assert = require('assert');
var cli = require('../lib/cli');

//
// Test data
//
var testData = {};
testData.skeleton = path.join(__dirname, 'mocks/test-cli/');
testData.default = require('../defaults.json');
testData.local = require(path.join(testData.skeleton, 'robot.json'));
testData.cli = require('./mocks/test-cli/cli.json');

//
// Test suite
//
suite('CLI', function() {

  var instance;

  setup(function() {
    instance = cli;
  });

  teardown(function() {
    instance = null;
  });

  suite('Scratch', function() {

  });

  suite('Compile', function() {

  });

});