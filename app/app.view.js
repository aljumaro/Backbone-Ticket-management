const {View} = require('backbone');

module.exports = View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html('Hello Backbone');
  }
});