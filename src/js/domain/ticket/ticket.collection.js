const Ticket = require('./ticket.model');

module.exports = Backbone.Collection.extend({
	model: Ticket
});