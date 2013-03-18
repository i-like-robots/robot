var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var Layouts = require('../lib/layouts');

//
// Test data
//
var testData  = {};
testData.mocks = path.join(__dirname, 'mocks/test-layouts');
testData.path = path.join(testData.mocks, 'layouts');

//
// Test suite
//
suite('Layouts', function() {

  var instance;

  setup(function() {
    instance = new Layouts(testData.mocks);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.layoutsPath, testData.path);
  });

  test('Should read layout.html', function(done) {
    instance.readLayout(path.join(testData.path, 'layout.html'), 'layout', function() {
      assert.ok(instance.layouts.hasOwnProperty('layout'));
      assert.ok(instance.layouts['layout'].raw.length);
      done();
    });
  });

  test('Should find layout.html', function(done) {
    instance.scanDirectory(function() {
      assert.ok(instance.layouts.hasOwnProperty('layout'));
      done();
    });
  });

  test('Should ignore none .html', function(done) {
    instance.scanDirectory(function() {
      assert.equal(instance.layouts.hasOwnProperty('ignore-layout'), false);
      done();
    });
  });

});