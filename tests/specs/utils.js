var fs = require('fs');
var path = require('path');
var assert = require('assert');
var instance = require('../../lib/robot/utils.js');

describe('Utilities', function() {

  var mocks = path.join(__dirname, '../mocks/');

  describe('Parse front matter', function() {

    var files = {
      html: path.join(mocks, 'pages/foo.html'),
      ignore: path.join(mocks, 'pages/ignore.xml'),
      invalid: path.join(mocks, 'pages/invalid.html')
    };

    it ('Should parse front matter', function() {
      var contents = fs.readFileSync(files.html, 'utf-8');
      var result = instance.parseFrontMatter(contents);
      assert.ok(result.data.hasOwnProperty('title'));
    });

    it('Should return error if front matter not found', function() {
      var contents = '';
      var result = instance.parseFrontMatter(contents);

      assert.ok(result instanceof Error);
    });

    it('Should return error if front matter is invalid', function() {
      var contents = fs.readFileSync(files.invalid, 'utf-8');
      var result = instance.parseFrontMatter(contents);

      assert.ok(result instanceof Error);
    });

  });

});