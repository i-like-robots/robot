var handlebars = require('handlebars');

module.exports = {

  getData: function() {
    return {};
  },

  getPages: function() {
    return {
      'bar.html': {
        getData: function() {
          return {
            title: 'Foo Bar Baz',
            layout: 'foo'
          };
        },
        getTemplate: function() {
          return 'Lorem ipsum doler';
        }
      }
    };
  },

  getLayouts: function() {
    return {
      foo: handlebars.compile('{{{content}}}')
    };
  }

};