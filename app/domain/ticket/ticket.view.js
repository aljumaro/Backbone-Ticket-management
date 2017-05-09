const _ = require('underscore');
const { View } = require('backbone');
const Ticket = require('./domain/ticket/ticket.model');

module.exports = View.extend({

	tagName: 'li',

	template: _.template('Test template');

	events: {
		'dblclick label': 'edit',
	    'keypress .edit': 'updateOnEnter',
	    'blur .edit':   'close'
	}

    initialize: function(opts) {
    	this.options = opts || {};
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
    },

    edit: function() {
    	console.log('edit');
    },

    updateOnEnter: function() {
    	console.log('updateOnEnter');
    },

    close: function() {
    	console.log('close');
    }
});
