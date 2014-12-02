define([
	"ember",
	"text!templates/statementOpenIfTemplate.html",
	"views/panelParentStatementView"
], function(Ember, statementOpenIfTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'openIf',
		defaultTemplate: Ember.Handlebars.compile(statementOpenIfTemplate)
	});

	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'openIf',
		defaultTemplate: Ember.Handlebars.compile(statementOpenIfTemplate)
	}); 

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});