const _ = require('underscore');
const { View } = require('backbone');
const TicketView = require('./ticket.view');
const TicketCollection = require('./ticket.collection');
const Ticket = require('./ticket.model');

module.exports = View.extend({
	tagName: 'ul',

	className: 'container',

	id: 'ticket-list',

	initialize: function() {
    	const t1 = new Ticket({title: 'T1', description: 'Title 1'});
		const t2 = new Ticket({title: 'T2', description: 'Title 2'});
		const t3 = new Ticket({title: 'T3', description: 'Title 3'});
		this.tickets = new TicketCollection([t1, t2, t3]);
	},

	render: function() {

		_.each(this.tickets.models, (t) => {

			const ticketView = new TicketView({model: t});

			this.$el.append(ticketView.render().el);

		}, this);

		return this;

	}
});