var fs = require('fs');
var path = require('path');
var assert = require('assert');
var Page = require('../../../lib/robot/models/page.js');

describe('Page', function() {

  var mocks = path.join(__dirname, '../../mocks/');

  describe('Parse front matter', function() {

    it('Should parse YAML front matter and return data and template', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/foo.html'), 'utf-8');
      var instance = new Page('foo.html', input).parseFrontMatter();

      assert.equal(instance.hasOwnProperty('data'), true);
      assert.equal(instance.hasOwnProperty('template'), true);
      assert.equal(instance.data.title, 'Foo');
      assert.equal(instance.template.length > 0, true);
    });

    it('Should return error if front matter not found', function() {
      var input = '';
      var instance = new Page('', input).parseFrontMatter();

      assert.equal(instance instanceof Error, true);
    });

    it('Should return error if front matter is invalid', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/invalid.html'), 'utf-8');
      var instance = new Page('invalid.html', input).parseFrontMatter();

      assert.equal(instance instanceof Error, true);
    });

  });

  describe('Get data', function() {

    it('Should return data as an object', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/foo.html'), 'utf-8');
      var instance = new Page('foo.html', input).getData();

      assert.equal(typeof instance, 'object');
      assert.equal(instance.title, 'Foo');
    });

    it('Should return an error if data is invalid', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/invalid.html'), 'utf-8');
      var instance = new Page('invalid.html', input).getData();

      assert.equal(instance instanceof Error, true);
    });

  });

  describe('Get template', function() {

    it('Should return template as Handlebars template function', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/foo.html'), 'utf-8');
      var instance = new Page('foo.html', input).getTemplate();

      assert.equal(typeof instance, 'function');
    });

    it('Should return an error if data is invalid', function() {
      var input = fs.readFileSync(path.join(mocks, 'pages/invalid.html'), 'utf-8');
      var instance = new Page('invalid.html', input).getTemplate();

      assert.equal(instance instanceof Error, true);
    });

  });

});