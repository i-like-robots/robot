var yaml = require('js-yaml');
var handlebars = require('handlebars');

/**
 * Page
 * @constructor
 * @param {String} name
 * @param {String} data
 */
var Page = module.exports = function(name, data) {
  this.name = name;
  this.data = data;
};

/**
 * Parse front matter
 * @returns {Object|Error}
 */
Page.prototype.parseFrontMatter = function() {
  var frontMatter;
  var split = this.data.trim().match(/^\-{3}([\w\W]+)\-{3}([\w\W]+)$/);

  if (!split || split.length !== 3) {
    return new Error('Could not find front matter block');
  }

  try {
    frontMatter = yaml.load(split[1]);
  }
  catch(err) {
    return new Error('Could not parse front matter data');
  }

  return {
    data: frontMatter,
    template: split[2]
  };
};

/**
 * Get data
 * @returns {Object|Error}
 */
Page.prototype.getData = function() {
  var split = this.parseFrontMatter(this.data);
  return split instanceof Error ? split : split.data;
};

/**
 * Get template
 * @returns {Function|Error}
 */
Page.prototype.getTemplate = function() {
  var split = this.parseFrontMatter(this.data);
  return split instanceof Error ? split : handlebars.compile(split.template);
};