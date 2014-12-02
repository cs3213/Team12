define([
	"ember",
	"text!templates/statementCloseIfTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementCloseIfTemplate, parentView) {
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'closeIf',
		defaultTemplate: Ember.Handlebars.compile(statementCloseIfTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'closeIf',
		defaultTemplate: Ember.Handlebars.compile(statementCloseIfTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});