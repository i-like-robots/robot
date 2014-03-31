var path = require('path');
var fs = require('fs-extra');
var assert = require('assert');
var writer = require('../../lib/robot/writer.js');

describe('Writer', function() {

  var mocks = path.join(__dirname, '../mocks');
  var temp = path.join(__dirname, '../temp/writer');

  after(function(done) {
    fs.remove(temp, done);
  });

  describe('Prepare template', function() {

    it('Should return a Handlebars template instance', function() {
      var output = writer.prepareTemplate('{{content}}');

      assert.equal(typeof output, 'function');
    });

  });

  describe('Compile template', function() {

    it('Should return a compiled string when given a template and data', function() {
      var inputData = { content: 'Hello World' };
      var inputTemplate = '<p>{{content}}</p>';
      var result = writer.compileTemplate(inputTemplate, inputData);

      assert.equal(result, '<p>Hello World</p>');
    });

  });

  describe('Compile page', function() {

    it('Should return a compiled string with layout', function() {
      var inputPage = 'Hello World';
      var inputLayout = '<layout>{{{content}}}</layout>';
      var result = writer.compilePage(inputPage, inputLayout, {});

      assert.equal(result, '<layout>Hello World</layout>');
    });

    it('Should return a compiled string without layout', function() {
      var inputPage = 'Hello World';
      var result = writer.compilePage(inputPage, null, {});

      assert.equal(result, 'Hello World');
    });

  });

  describe('Write file to disk', function() {
    var targetPath = path.join(temp, 'test.html');

    it('Should write a file with contents to disk', function(done) {
      var inputContent = 'foo';

      writer.writeToDisk(targetPath, inputContent, function(err) {
        var result = fs.readFileSync(targetPath, 'utf-8');

        assert.equal(err, null);
        assert.equal(result, inputContent);

        done();
      });

    });

  });

});