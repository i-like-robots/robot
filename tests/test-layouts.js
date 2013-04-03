var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var layouts = require('../lib/layouts');

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
    instance = layouts;
  });

  teardown(function() {
    instance = null;
  });

  suite('Scan directory', function() {

    test('Should find layout.html', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.ok(instance.layouts.hasOwnProperty('layout'));
        done();
      });
    });

    test('Should ignore none .html', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.equal(instance.layouts.hasOwnProperty('ignore'), false);
        done();
      });
    });

  });

  suite('Read and parse', function() {

    test('Should read layout.html', function(done) {
      instance.readLayout(path.join(testData.path, 'layout.html'), 'layout', function() {
        assert.ok(instance.layouts.hasOwnProperty('layout'));
        assert.ok(instance.layouts['layout'].raw.length);
        done();
      });
    });

  });

});