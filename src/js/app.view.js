const TicketListView = require('./domain/ticket/ticket-list.view');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {

    	const ticketListView = new TicketListView();

        this.$el.html(ticketListView.render().el);
    }
});
