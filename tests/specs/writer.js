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
      var inputContent = 'bar';
      var inputTemplate = '<p>{{content}}</p>';
      var result = writer.compileTemplate(inputTemplate, { content: inputContent });

      assert.equal(result, '<p>bar</p>');
    });

  });

  describe('Compile page with layout', function() {

    it('Should return a compiled string', function() {
      var inputPage = 'page content';
      var inputLayout = '<layout>{{{content}}}</layout>';
      var result = writer.compilePageWithLayout(inputPage, inputLayout, {});

      assert.equal(result, '<layout>page content</layout>');
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