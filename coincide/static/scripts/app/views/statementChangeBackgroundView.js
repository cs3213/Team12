define([
	"ember",
	"text!templates/statementChangeBackgroundTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementChangeBackgroundTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'changeBackground',
		defaultTemplate: Ember.Handlebars.compile(statementChangeBackgroundTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'changeBackground',
		defaultTemplate: Ember.Handlebars.compile(statementChangeBackgroundTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});