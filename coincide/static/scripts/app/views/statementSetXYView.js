define([
	"ember",
	"text!templates/statementSetXYTemplate.html",
	"views/panelParentStatementView"
], function(Ember, statementSetXYTemplate, parentView) {
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'setxy',
		defaultTemplate: Ember.Handlebars.compile(statementSetXYTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'setxy',
		defaultTemplate: Ember.Handlebars.compile(statementSetXYTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});