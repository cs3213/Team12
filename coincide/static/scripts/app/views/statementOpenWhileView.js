define([
	"ember",
	"text!templates/statementOpenWhileTemplate.html",
	"views/panelParentStatementView"
], function(Ember, statementOpenForTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'openwhile',
		defaultTemplate: Ember.Handlebars.compile(statementOpenForTemplate)
	});

	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'openwhile',
		defaultTemplate: Ember.Handlebars.compile(statementOpenForTemplate)
	}); 

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});