var path = require('path');
var assert = require('assert');
var handlebars = require('handlebars');
var Partials = require('../lib/partials');

var source = __dirname + '/test-data';
var partialsPath = path.join(source, 'partials');

suite('Partials', function() {

  var instance;

  setup(function() {
    instance = new Partials(source);
  });

  teardown(function() {
    instance = null;
  });

  test('Constructor should calculate correct path', function() {
    assert.equal(instance.partialsPath, partialsPath);
  });

  test('Should find foo.html', function(done) {
    instance.scanDirectory(function() {
      assert.ok(handlebars.partials.hasOwnProperty('foo'));
      done();
    });
  });

  test('Should ignore bar.htmlx', function(done) {
    instance.scanDirectory(function() {
      assert.equal(handlebars.partials.hasOwnProperty('bar.htmlx'), false);
      done();
    });
  });

  test('Should read foo.html', function(done) {
    instance.readPartial(partialsPath + '/foo.html', 'foo', function() {
      assert.ok(handlebars.partials.hasOwnProperty('foo'));
      done();
    });
  });

});