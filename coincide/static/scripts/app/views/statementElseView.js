define([
	"ember",
	"text!templates/statementElseTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementElseTemplate, parentView) {
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'elsev',
		defaultTemplate: Ember.Handlebars.compile(statementElseTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'elsev',
		defaultTemplate: Ember.Handlebars.compile(statementElseTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});