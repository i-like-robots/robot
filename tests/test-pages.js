var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var pages = require('../lib/pages');

//
// Test data
//
var testData  = {};
testData.mocks = path.join(__dirname, 'mocks/test-pages');
testData.path = path.join(testData.mocks, 'pages');

//
// Test suite
//
suite('Pages', function() {

  var instance;

  setup(function() {
    instance = pages;
  });

  teardown(function() {
    instance = null;
  });

  suite('Scan directory', function() {

    test('Should find page.html', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.ok(instance.pages.hasOwnProperty('page.html'));
        done();
      });
    });

    test('Should ignore none .html', function(done) {
      instance.scanDirectory(testData.mocks, function() {
        assert.equal(instance.pages.hasOwnProperty('ignore-page.not'), false);
        done();
      });
    });

  });

  suite('Read and parse', function() {

    test('Should read page.html and parse frontmatter', function(done) {
      instance.readPage(path.join(testData.path, '/page.html'), 'page.html', function() {
        assert.ok(instance.pages.hasOwnProperty('page.html'));
        assert.ok(instance.pages['page.html'].raw.length);
        assert.ok(instance.pages['page.html'].data.hasOwnProperty('title'));
        done();
      });
    });

    // Test front matter error

  });

});