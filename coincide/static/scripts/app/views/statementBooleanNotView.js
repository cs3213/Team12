define([
	"ember",
	"text!templates/statementBooleanNotTemplate.html",
	"views/panelParentStatementView",
	], function(Ember, statementBooleanNotTemplate, parentView) {
		var parent = parentView.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'booleanNot',
			defaultTemplate: Ember.Handlebars.compile(statementBooleanNotTemplate),
		});
		var child = Ember.View.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'booleanNot',
			defaultTemplate: Ember.Handlebars.compile(statementBooleanNotTemplate),
		});
		var exports = {
			parent: parent,
			child: child,
		};
		return exports;
	}	
);