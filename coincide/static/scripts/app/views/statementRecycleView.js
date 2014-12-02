define([
	"ember",
	"text!templates/statementRecycleTemplate.html",
	"views/panelParentStatementView"
], function(Ember, statementRecycleTemplate, parentView) {
	
	var recycle = Ember.View.extend({
		type: 'recycle',
		defaultTemplate: Ember.Handlebars.compile(statementRecycleTemplate),
		didInsertElement: function() {
			this.$('.recycle').sortable({
				update: function(e, ui) {
					console.log('recycle: ', this, e, ui);
					ui.item.remove();
				}
			});
		},
	}); 
	recycle.parent = recycle;
	return recycle;
});