define([
	"ember",
	"text!templates/statementMathTemplate.html",
	"views/panelParentStatementView",
	], function(Ember, statementMathTemplate, parentView) {
		var parent = parentView.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'math',
			defaultTemplate: Ember.Handlebars.compile(statementMathTemplate),
		});
		var child = Ember.View.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'math',
			defaultTemplate: Ember.Handlebars.compile(statementMathTemplate),
		});
		var exports = {
			parent: parent,
			child: child,
		};
		return exports;
	}	
);