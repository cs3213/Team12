define([
	"ember",
	"text!templates/statementCreateTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementCreateTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'create',
		defaultTemplate: Ember.Handlebars.compile(statementCreateTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'create',
		defaultTemplate: Ember.Handlebars.compile(statementCreateTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});