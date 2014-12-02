define([
	"ember",
	"text!templates/statementMousePositionTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementMousePositionTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'mousePosition',
		defaultTemplate: Ember.Handlebars.compile(statementMousePositionTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'mousePosition',
		defaultTemplate: Ember.Handlebars.compile(statementMousePositionTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});