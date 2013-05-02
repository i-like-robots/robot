var fs = require('fs');
var path = require('path');
var assert = require('assert');
var instance = require('../../../lib/robot/models/page.js');

describe('Page', function() {

  var mocks = path.join(__dirname, '../../mocks/');

  describe('Parse front matter', function() {

    it('Should parse YAML front matter and return data and template', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/foo.html'), 'utf-8');
      var output = new instance('foo.html', input).parseFrontMatter();

      assert.equal(output.hasOwnProperty('data'), true);
      assert.equal(output.hasOwnProperty('template'), true);
      assert.equal(output.data.title, 'Foo');
      assert.equal(output.template.length > 0, true);
    });

    it('Should return error if front matter not found', function() {
      var input = '';
      var output = new instance('', input).parseFrontMatter();
      assert.equal(output instanceof Error, true);
    });

    it('Should return error if front matter is invalid', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/invalid.html'), 'utf-8');
      var output = new instance('invalid.html', input).parseFrontMatter();
      assert.equal(output instanceof Error, true);
    });

  });

  describe('Get data', function() {

    it('Should return data as an object', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/foo.html'), 'utf-8');
      var output = new instance('foo.html', input).getData();

      assert.equal(typeof output, 'object');
      assert.equal(output.title, 'Foo');
    });

    it('Should return an error if data is invalid', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/invalid.html'), 'utf-8');
      var output = new instance('invalid.html', input).getData();
      assert.equal(output instanceof Error, true);
    });

  });

  describe('Get template', function() {

    it('Should return template as Handlebars template function', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/foo.html'), 'utf-8');
      var output = new instance('foo.html', input).getTemplate();

      assert.equal(typeof output, 'function');
    });

    it('Should return an error if data is invalid', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/invalid.html'), 'utf-8');
      var output = new instance('invalid.html', input).getTemplate();
      assert.equal(output instanceof Error, true);
    });

  });

});