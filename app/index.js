const _ = require('underscore');
const $ = require('jquery');
const Backbone = require('backbone');

const AppView = require('./app.view')

$(function() {
  const view = new AppView({
    el: 'app'
  });
});