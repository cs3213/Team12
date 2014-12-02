define([
	"ember",
	"text!templates/statementMoveTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementMoveTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'move',
		defaultTemplate: Ember.Handlebars.compile(statementMoveTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'move',
		defaultTemplate: Ember.Handlebars.compile(statementMoveTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});