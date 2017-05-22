//const TicketListView = require('./domain/ticket/ticket-list.view');
var StatsTemplate = require("./stats.view.handlebars");
const TodoCollection = require('./domain/todo/todo.collection');
const TodoView = require('./domain/todo/todo.view');

module.exports = Backbone.View.extend({

	models: new TodoCollection(),

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

    initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');
        this.$list = this.$('#todo-list');

        this.listenTo(this.models, 'add', this.addOne);
        this.listenTo(this.models, 'reset', this.addAll);
        this.listenTo(this.models, 'change:completed', this.filterOne);
        this.listenTo(this.models, 'filter', this.filterAll);
        this.listenTo(this.models, 'all', this.render);

        this.models.fetch();
    },

    addOne: function(todo){
    	var view = new TodoView({model: todo});
    	this.$list.append(view.render().el);
    },

    addAll: function(){
    	this.$list.html('');
    	models.each(this.addOne, this);
    },

    filterOne: function(todo) {
    	todo.trigger('visible');
    },

    filterAll: function(){
    	this.models.each(this.filterOne, this);
    },

    newAttributes: function() {
    	return {
    		title: this.$input.val().trim(),
    		order: this.models.nextOrder()
    	}
    },

    createOnEnter: function(event) {
    	if (event.which !== 13 || !this.$input.val().trim()) {
    		return;
    	}

    	this.models.create(this.newAttributes());
    	this.$input.val('');
    },

    clearCompleted: function() {
    	_.invoke(this.models.completed(), 'destroy');
    	return false;
    },

    toggleAllComplete: function() {
    	var completed = this.allCheckbox.checked;

    	this.models.each((t) => t.save({completed: completed}));
    },

    render: function() {
    	let completed = this.models.completed().length;
    	let remaining = this.models.remaining().length;
    	let multipleRemaining = remaining > 1;

    	if (this.models.length) {
    		this.$main.show();
    		this.$footer.show();
    		this.$footer.html(StatsTemplate({
    			completed: completed,
    			remaining: remaining,
    			multipleRemaining: multipleRemaining
    		}));
    	} else {
    		this.$main.hide();
    		this.$footer.hide();
    	}

    	this.allCheckbox.checked = !remaining;
    }
});
