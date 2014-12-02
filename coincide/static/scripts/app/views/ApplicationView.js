define([
	"ember",
	"text!templates/applicationTemplate.html"
], function(Ember, applicationTemplate) {
	var ApplicationView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(applicationTemplate),
		accountView: $("#login").html(),
		didInsertElement: function() {
			//alert("haha");
			$('#myTab a[href="#character"]').tab('show') 
		}
	});
	return ApplicationView;
});