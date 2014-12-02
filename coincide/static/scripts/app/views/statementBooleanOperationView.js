define([
	"ember",
	"text!templates/statementBooleanOperationTemplate.html",
	"views/panelParentStatementView",
	], function(Ember, statementBooleanOperationTemplate, parentView) {
		var parent = parentView.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'booleanOp',
			defaultTemplate: Ember.Handlebars.compile(statementBooleanOperationTemplate),
		});
		var child = Ember.View.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'booleanOp',
			defaultTemplate: Ember.Handlebars.compile(statementBooleanOperationTemplate),
		});
		var exports = {
			parent: parent,
			child: child,
		};
		return exports;
	}	
);