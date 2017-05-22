var Todo = require('./todo.model');
var localStorage = require('backbone.localstorage');
var LocalStorage = localStorage.LocalStorage;

module.exports = Backbone.Collection.extend({

	model: Todo,

	localStorage: new LocalStorage('todos-backbone'),

	completed: function() {
		return this.filter((t) => t.get('completed'));
	},

	remaining: function() {
		return this.without.apply(this, this.completed());
	},

	nextOrder: function() {
		if (!this.lenght) {
			return 1;
		}

		return this.last().get('order') + 1;
	},

	comparator: function(todo) {
		return todo.get('order');
	}

});