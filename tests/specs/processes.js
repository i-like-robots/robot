var path = require('path');
var fs = require('fs-extra');
var assert = require('assert');
var processes = require('../../lib/robot/processes.js');

describe('Processes', function() {

  var mocks = path.join(__dirname, '../mocks');
  var temp = path.join(__dirname, '../temp/processes');

  after(function(done) {
    fs.remove(temp, done);
  });

  describe('Read resources', function() {
    it('Should scan and load all resources in series', function(done) {
      processes.readResources(mocks, function(err, resources) {
        assert.equal(err, null);
        assert.equal(resources.getData().hasOwnProperty('foo'), true);
        assert.equal(resources.getPartials().hasOwnProperty('foo'), true);
        assert.equal(resources.getLayouts().hasOwnProperty('foo'), true);
        assert.equal(resources.getPages().hasOwnProperty('foo.html'), true);

        done();
      });
    });
  });

  describe('Write output', function() {
    var targetPath = path.join(temp, 'bar.html');

    it('Should process pages and write to file', function(done) {
      var resources = require(path.join(mocks, 'processes/resources.js'));

      processes.writeOutput(temp, resources, function(err) {
        assert.equal(err, null);
        assert.equal(fs.existsSync(targetPath), true);
        assert.equal(fs.readFileSync(targetPath, 'utf-8'), resources.getPages()['bar.html'].getTemplate());

        done();
      });

    });

  });

  describe('Append includes', function() {
    var sourcePath = path.join(__dirname, '../mocks/processes');
    var targetPath = path.join(temp, 'include');

    it('Should copy the source folder and contents to the target', function(done) {
      var includes = ['include'];

      processes.appendIncludes(sourcePath, temp, includes, function(err) {
        assert.equal(err, null);
        assert.equal(fs.existsSync(targetPath), true);
        assert.equal(fs.existsSync(path.join(targetPath, 'content.xml')), true);

        done();
      });

    });

  });

});