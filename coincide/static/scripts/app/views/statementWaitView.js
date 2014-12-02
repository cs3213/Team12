define([
	"ember",
	"text!templates/statementWaitTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementWaitTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'wait',
		defaultTemplate: Ember.Handlebars.compile(statementWaitTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'wait',
		defaultTemplate: Ember.Handlebars.compile(statementWaitTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});