define([
	"ember",
], function (ember) {
	console.log("in panelParentStatementView!");
	var panelParentStatementView = Ember.View.extend({

		isPanelStatement: true,

		isDragging: false,

		panelView: function() {
			return Ember.View.views[$('.statement-panel').attr('id')];
		}.property(),

		didInsertElement: function() {
			if (this.get('isPanelStatement')) {
			}
			else {
			}

			// this.get('panelView').setDraggable();
		},

		mouseDown: function(e) {
			// console.log('in parent statement, mousedown');
			this.set('isDragging', true);
		},

		mouseUp: function(e) {
			// console.log('in parent statement, mouseup');
			this.set('isDragging', false);
		},

		mouseMove: function(e) {
			// console.log('in parent statement, mousemove');
			// if (this.get('isDragging')) {
			// 	this.set('isDragging', false);
			// 	this.createViewAndInsert(e);
			// }
			// return false;
		},

		createViewAndInsert: function(e) {
			var elem = this.$();
			var type = elem.attr('data-statement-type');
			
		},

	});

	return panelParentStatementView;
});