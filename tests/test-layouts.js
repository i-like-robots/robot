var path = require('path');
var assert = require('assert');
var Layouts = require('../lib/layouts');

var source = __dirname + '/test-data';
var layoutsPath = path.join(source, 'layouts');

suite('Layouts', function() {

  var instance;

  setup(function() {
    instance = new Layouts(source);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.layoutsPath, layoutsPath);
  });

  test('Should find foo.html', function(done) {
    instance.scanDirectory(function() {
      assert.ok(instance.layouts.hasOwnProperty('foo'));
      done();
    });
  });

  test('Should ignore bar.htmlx', function(done) {
    instance.scanDirectory(function() {
      assert.equal(instance.layouts.hasOwnProperty('bar'), false);
      done();
    });
  });

  test('Should read foo.html', function(done) {
    instance.readLayout(layoutsPath + '/foo.html', 'foo', function() {
      assert.ok(instance.layouts.hasOwnProperty('foo'));
      assert.ok(instance.layouts['foo'].raw.length);
      done();
    });
  });

});