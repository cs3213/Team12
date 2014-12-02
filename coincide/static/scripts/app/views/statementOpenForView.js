define([
	"ember",
	"text!templates/statementOpenForTemplate.html",
	"views/panelParentStatementView"
], function(Ember, statementOpenForTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'openfor',
		defaultTemplate: Ember.Handlebars.compile(statementOpenForTemplate)
	});

	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'openfor',
		defaultTemplate: Ember.Handlebars.compile(statementOpenForTemplate)
	}); 

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});