module.exports = Backbone.Router.extend({

	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function (filter) {
		this.app.currentFilter = filter;
		this.app.models.trigger('filter');
		console.log(filter);
	}
});