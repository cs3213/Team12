define([
	"ember",
	"text!templates/statementRotateClockHandsTemplate.html",
	"views/panelParentStatementView",
	], function(Ember, statementRotateClockHandsTemplate, parentView) {
		var parent = parentView.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'rotateClockHands',
			defaultTemplate: Ember.Handlebars.compile(statementRotateClockHandsTemplate),
		});
		var child = Ember.View.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'rotateClockHands',
			defaultTemplate: Ember.Handlebars.compile(statementRotateClockHandsTemplate),
		});
		var exports = {
			parent: parent,
			child: child,
		};
		return exports;
	}	
);