define([
	"ember",
	"text!templates/statementHideCharTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementHideCharTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'hideChar',
		defaultTemplate: Ember.Handlebars.compile(statementHideCharTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'hideChar',
		defaultTemplate: Ember.Handlebars.compile(statementHideCharTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});