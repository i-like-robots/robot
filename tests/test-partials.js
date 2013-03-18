var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var Partials = require('../lib/partials');

//
// Test data
//
var testData  = {};
testData.mocks = path.join(__dirname, 'mocks/test-partials');
testData.path = path.join(testData.mocks, 'partials');

//
// Test suite
//
suite('Partials', function() {

  var instance;

  setup(function() {
    instance = new Partials(testData.mocks);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.partialsPath, testData.path);
  });

  test('Should read partial.html', function(done) {
    instance.readPartial(path.join(testData.path, 'partial.html'), 'partial', function() {
      assert.ok(handlebars.partials.hasOwnProperty('partial'));
      assert.ok(handlebars.partials['partial'].length);
      done();
    });
  });

  test('Should find partial.html', function(done) {
    instance.scanDirectory(function() {
      assert.ok(handlebars.partials.hasOwnProperty('partial'));
      done();
    });
  });

  test('Should ignore none .html', function(done) {
    instance.scanDirectory(function() {
      assert.equal(handlebars.partials.hasOwnProperty('ignore-partial'), false);
      done();
    });
  });

});