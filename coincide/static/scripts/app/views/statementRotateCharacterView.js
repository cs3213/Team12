define([
	"ember",
	"text!templates/statementRotateCharacterTemplate.html",
	"views/panelParentStatementView",
	], function(Ember, statementRotateCharacterTemplate, parentView) {
		var parent = parentView.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'rotateCharacter',
			defaultTemplate: Ember.Handlebars.compile(statementRotateCharacterTemplate),
		});
		var child = Ember.View.extend({
			attributeBindings:['type: data-statement-type'],
			type: 'rotateCharacter',
			defaultTemplate: Ember.Handlebars.compile(statementRotateCharacterTemplate),
		});
		var exports = {
			parent: parent,
			child: child,
		};
		return exports;
	}	
);