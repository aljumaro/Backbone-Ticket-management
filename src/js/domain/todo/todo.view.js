var TodoTemplate = require("./todo.view.handlebars");

module.exports = Backbone.View.extend({

	tagName: 'li',

	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	toggleCompleted: function(){
		this.model.toggle();
	},

	toggleVisible: function(filter) {
		this.$el.toggleClass('hidden', this.isHidden(filter));
	},

	isHidden: function(filter) {
		let isCompleted = this.model.get('completed');
		return (
			(!isCompleted && filter === 'completed')
			|| 
			(isCompleted && filter === 'active')
		);
	},

	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	updateOnEnter: function(event) {
		if (event.which === 13) {
			this.close();
		}
	},

	close: function() {
		let value = this.$input.val().trim();

		if (value){
			this.model.save({title: value});
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	clear: function() {
		this.model.destroy();
	},

	render: function(){
		this.$el.html(TodoTemplate(this.model.toJSON()));

		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();

		this.$input = this.$('.edit');
		return this;
	}
});