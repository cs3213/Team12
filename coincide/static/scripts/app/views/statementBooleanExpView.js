define([
	"ember",
	"text!templates/statementBooleanExpTemplate.html",
	"views/panelParentStatementView",
	], function(Ember, statementBooleanExpTemplate, parentView) {
		var parent = parentView.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'booleanExp',
			defaultTemplate: Ember.Handlebars.compile(statementBooleanExpTemplate),
		});
		var child = Ember.View.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'booleanExp',
			defaultTemplate: Ember.Handlebars.compile(statementBooleanExpTemplate),
		});
		var exports = {
			parent: parent,
			child: child,
		};
		return exports;
	}	
);