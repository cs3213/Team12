define([
	"ember",
	"text!templates/statementPlayMusicTemplate.html",
	"views/panelParentStatementView",
], function(Ember, statementPlayMusicTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'playMusic',
		defaultTemplate: Ember.Handlebars.compile(statementPlayMusicTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'playMusic',
		defaultTemplate: Ember.Handlebars.compile(statementPlayMusicTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});