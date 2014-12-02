define([
	"ember",
	"text!templates/statementAssignVariableTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementCreateVariableTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'assignVariable',
		defaultTemplate: Ember.Handlebars.compile(statementCreateVariableTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'assignVariable',
		defaultTemplate: Ember.Handlebars.compile(statementCreateVariableTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});