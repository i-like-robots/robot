var yaml = require('js-yaml');

/**
 * Parse Front Matter
 * @param {String} data
 * @returns {Object|Error}
 */
exports.parseFrontMatter = function(data) {
  var frontMatter;
  var split = data.trim().match(/^\-{3,}([\w\W]+)\-{3,}([\w\W]+)$/);

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