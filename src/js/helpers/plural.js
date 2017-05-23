module.exports = function (number, text, options) {
	let hash = options.hash;
	let tempPlural = (hash.pluralForm) ? hash.pluralForm : 's';
	return (number === 1)? text : text + tempPlural;
}