var fs = require('fs');
var path = require('path');
var assert = require('assert');
var processes = require('../../lib/robot/processes.js');

describe('Processes', function() {

  var mocks = path.join(__dirname, '../mocks');

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

    var target = path.join(__dirname, '../temp');
    var output = path.join(__dirname, '../temp/bar.html');

    after(function() {
      fs.unlinkSync(output);
    });

    it('Should process pages and write to file', function(done) {
      var resources = require(path.join(mocks, 'processes/resources.js'));

      processes.writeOutput(target, resources, function(err) {
        assert.equal(err, null);
        assert.equal(fs.existsSync(output), true);
        assert.equal(fs.readFileSync(output, 'utf-8'), resources.getPages()['bar.html'].getTemplate());

        done();
      });

    });

  });

  describe('Append includes', function() {

    var sourcePath = path.join(__dirname, '../mocks/processes');
    var outputPath = path.join(__dirname, '../temp');
    var target = path.join(outputPath, 'include');

    after(function() {
      // TODO: rm -rf
      //fs.unlinkSync(target);
    });

    it('Should copy the source folder and contents to the target', function(done) {
      var includes = ['include'];

      processes.appendIncludes(sourcePath, outputPath, includes, function(err) {
        assert.equal(err, null);
        assert.equal(fs.existsSync(target), true);
        assert.equal(fs.existsSync(path.join(target, 'content.xml')), true);

        done();
      });

    });

  });

});