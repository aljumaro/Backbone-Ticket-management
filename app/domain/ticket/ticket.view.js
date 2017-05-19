const _ = require('underscore');
const $ = require('jquery');
const { View } = require('backbone');
var TicketTemplate = require("./ticket.view.handlebars");

module.exports = View.extend({

	tagName: 'li',

	events: {
		'dblclick label': 'edit',
	    'keypress .edit': 'updateOnEnter',
	    'blur .edit':   'close'
	},

    initialize: function(opts) {
    	this.options = opts || {};
    },

    render: function() {
        this.$el.html(TicketTemplate(this.model.attributes));
        return this;
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
