(function(root){
	require(["config"], function(config){
		requirejs.config(config);
		require(["App", "ember", "jquery", 'sweetAlert','controllers/SaveLoad'], function(App, Ember, $, sweetAlert,saveload){
			//console.log('$$$$$$', saveload);
			var app_name = config.app_name || "App";
			root[app_name] = App = Ember.Application.create(App);		
		});
	});
})(this);

