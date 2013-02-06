var path = require('path');
var assert = require('assert');
var Pages = require('../lib/pages');

var source = __dirname + '/test-data';
var pagesPath = path.join(source, 'pages');

suite('Pages', function() {

  var instance;

  setup(function() {
    instance = new Pages(source);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.pagesPath, pagesPath);
  });

  test('Should find foo.html', function(done) {
    instance.scanDirectory(function() {
      assert.ok(instance.pages.hasOwnProperty('foo.html'));
      done();
    });
  });

  test('Should ignore bar.htmlx', function(done) {
    instance.scanDirectory(function() {
      assert.equal(instance.pages.hasOwnProperty('bar.htmlx'), false);
      done();
    });
  });

  test('Should read foo.html', function(done) {
    instance.readPage(pagesPath + '/foo.html', 'foo.html', function() {
      assert.ok(instance.pages.hasOwnProperty('foo.html'));
      assert.ok(instance.pages['foo.html'].raw.length);
      done();
    });
  });

});