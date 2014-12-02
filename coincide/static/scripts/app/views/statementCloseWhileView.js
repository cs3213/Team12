define([
	"ember",
	"text!templates/statementCloseWhileTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementCloseForTemplate, parentView) {
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'closewhile',
		defaultTemplate: Ember.Handlebars.compile(statementCloseForTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'closewhile',
		defaultTemplate: Ember.Handlebars.compile(statementCloseForTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});