define([
	"ember",
	"text!templates/statementsPlacementTemplate.html",
	"jquery.ui"
], function(Em, statementsPlacementTemplate, jqueryui) {
		var StatementsPlacementView = Em.View.extend({
			tagName: 'div',
			classNames: ['statements-list'],
			defaultTemplate: Ember.Handlebars.compile(statementsPlacementTemplate),
		});

		return StatementsPlacementView;
	}
);