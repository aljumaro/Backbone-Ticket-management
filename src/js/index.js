const AppView = require('./app.view');
const Workspace = require('./app.router');

$(function() {
    const view = new AppView({ 
        el: '.todoapp'
    });

    let ws = new Workspace();
    ws.app = view;
	Backbone.history.start();
});
