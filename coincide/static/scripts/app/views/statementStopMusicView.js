define([
	"ember",
	"text!templates/statementStopMusicTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementStopMusicTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'stopMusic',
		defaultTemplate: Ember.Handlebars.compile(statementStopMusicTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'stopMusic',
		defaultTemplate: Ember.Handlebars.compile(statementStopMusicTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});