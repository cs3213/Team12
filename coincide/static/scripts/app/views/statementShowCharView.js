define([
	"ember",
	"text!templates/statementShowCharTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementShowCharTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'showChar',
		defaultTemplate: Ember.Handlebars.compile(statementShowCharTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'showChar',
		defaultTemplate: Ember.Handlebars.compile(statementShowCharTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});