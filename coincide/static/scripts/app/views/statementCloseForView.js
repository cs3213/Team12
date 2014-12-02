define([
	"ember",
	"text!templates/statementCloseForTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementCloseForTemplate, parentView) {
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'closefor',
		defaultTemplate: Ember.Handlebars.compile(statementCloseForTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'closefor',
		defaultTemplate: Ember.Handlebars.compile(statementCloseForTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});