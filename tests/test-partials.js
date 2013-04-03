var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var partials = require('../lib/partials');

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
    instance = partials;
  });

  teardown(function() {
    instance = null;
  });

  suite('Scan directory', function() {

    test('Should find partial.html', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.ok(handlebars.partials.hasOwnProperty('partial'));
        done();
      });
    });

    test('Should ignore none .html', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.equal(handlebars.partials.hasOwnProperty('ignore'), false);
        done();
      });
    });

  });

  suite('Read and parse', function() {

    test('Should read partial.html', function(done) {
      instance.readPartial(path.join(testData.path, 'partial.html'), 'partial', function() {
        assert.ok(handlebars.partials.hasOwnProperty('partial'));
        assert.ok(handlebars.partials['partial'].length);
        done();
      });
    });

  });

});