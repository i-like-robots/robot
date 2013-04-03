var path = require('path');
var assert = require('assert');
var robot = require('../lib/robot');

//
// Test data
//
var testData  = {};
testData.mocks = path.join(__dirname, 'mocks/test-robot');

//
// Test suite
//
suite('Robot', function() {

  var instance;

  setup(function() {
    instance = robot;
  });

  teardown(function() {
    instance = null;
  });

  suite('Generate output', function() {

  });

  suite('Save to disk', function() {

  });

});