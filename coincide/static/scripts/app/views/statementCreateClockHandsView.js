define([
	"ember",
	"text!templates/statementCreateClockHandsTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementCreateClockHandsTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'createClockHands',
		defaultTemplate: Ember.Handlebars.compile(statementCreateClockHandsTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'createClockHands',
		defaultTemplate: Ember.Handlebars.compile(statementCreateClockHandsTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});