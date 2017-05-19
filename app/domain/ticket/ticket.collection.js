const { Collection } = require('backbone');
const Ticket = require('./ticket.model');

module.exports = Collection.extend({
	model: Ticket
});