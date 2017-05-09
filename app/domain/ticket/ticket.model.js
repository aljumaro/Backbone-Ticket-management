const { Model } = require('backbone');

module.exports = Model.extend({
    
    defaults: {
        title: '',
        description: '',
        status: 1
    },

    initialize: function() {
        this.on('change', () => console.log('- Values for this model have changed.'));
        this.on('invalid', (model, error) => console.log(error));
    },

    validate: (attrs) => {
    	if (attrs.title === '') {
    		return 'Remember to set a title';
    	}
    }
    
});