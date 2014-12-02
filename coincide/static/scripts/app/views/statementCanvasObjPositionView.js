define([
	"ember",
	"text!templates/statementCanvasObjPosition.html",
	"views/panelParentStatementView",
], function(Ember, statementCanvasObjPositionTemplate, parentView) {
	
	var parent = parentView.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'canvasObjPosition',
		defaultTemplate: Ember.Handlebars.compile(statementCanvasObjPositionTemplate)
	});
	var child = Ember.View.extend({
		attributeBindings: ['type:data-statement-type'],
		type: 'canvasObjPosition',
		defaultTemplate: Ember.Handlebars.compile(statementCanvasObjPositionTemplate)
	});

	var exports = {
		parent: parent,
		child: child
	};
	return exports;
});