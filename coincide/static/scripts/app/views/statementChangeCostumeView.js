define([
	"ember",
	"text!templates/statementChangeCostumeTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementChangeCostumeTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'changeCostume',
		defaultTemplate: Ember.Handlebars.compile(statementChangeCostumeTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'changeCostume',
		defaultTemplate: Ember.Handlebars.compile(statementChangeCostumeTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});