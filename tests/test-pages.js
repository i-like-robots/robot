var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var Pages = require('../lib/pages');

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
    instance = new Pages(testData.mocks);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.pagesPath, testData.path);
  });

  test('Should read page.html and parse frontmatter', function(done) {
    instance.readPage(path.join(testData.path, '/page.html'), 'page.html', function() {
      assert.ok(instance.pages.hasOwnProperty('page.html'));
      assert.ok(instance.pages['page.html'].raw.length);
      assert.ok(instance.pages['page.html'].data.hasOwnProperty('title'));
      done();
    });
  });

  test('Should find page.html', function(done) {
    instance.scanDirectory(function() {
      assert.ok(instance.pages.hasOwnProperty('page.html'));
      done();
    });
  });

  test('Should ignore none .html', function(done) {
    instance.scanDirectory(function() {
      assert.equal(instance.pages.hasOwnProperty('ignore-page.not'), false);
      done();
    });
  });

});