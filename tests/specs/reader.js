var path = require('path');
var assert = require('assert');
var instance = require('../../lib/robot/reader.js');

describe('Reader', function() {

  var mocks = path.join(__dirname, '../mocks/data/');

  describe('Scan directory', function() {

    it('Should return an array of files from directory', function(done) {
      instance.scanDirectory(mocks, function(err, files) {
        assert.equal(err, null);
        assert.equal(isNaN(files.length), false);
        done();
      });
    });

    it('Should return an error attempting to scan an incorrect path', function(done) {
      instance.scanDirectory('', function(err, files) {
        assert.ok(err instanceof Error);
        done();
      });
    });

  });

  describe('Filter by file type', function() {

    it('Should return an array of the same size if all files match', function() {
      var input = ['path/to/file.type'];
      var output = instance.filterByFileType(input, ['.type']);
      assert.equal(input.length, output.length);
    });

    it('Should return an empty array when no files match', function() {
      var input = ['path/to/file'];
      var output = instance.filterByFileType(input, ['.type']);
      assert.equal(output.length, 0);
    });

  });

  describe('Read files', function() {

    it('Should read each file and send data via callback', function(done) {
      var i = 0;
      var files = [mocks + '/test-json.json', mocks + '/test-js.js'];

      instance.readFiles(
        files,
        function(file, data) {
          i++;
          assert.ok(data.length);
        },
        function(err) {
          assert.equal(err, null);
          assert.equal(i, files.length);
          done();
        }
      );
    });

    it('Should return an error attempting to read an invalid file', function(done) {
      var i = 0;

      instance.readFiles(
        [''],
        function(file, data) {
          i++;
        },
        function(err) {
          assert.ok(err instanceof Error);
          assert.equal(i, 0);
          done();
        }
      );
    });

  });

});