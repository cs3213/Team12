define({
	waitSeconds: 0,
	app_name: "COINCIDE",
	shim: {
		'ember': {
			deps: ['handlebars', 'jquery'],
			exports: 'Ember'
		},
		'jquery.ui': ['jquery']
	},
	paths: {
		'App': 'app/main',
		'models': 'app/models',
		'views': 'app/views',
		'controllers': 'app/controllers',
		'templates': 'app/templates',
		'routes': 'app/routes',
		/*libs*/
		'jquery': 'libs/jquery/1.11.1/jquery-1.11.1.min',
		'handlebars': 'libs/handlebars/1.3.0/handlebars-v1.3.0',
		'ember': 'libs/ember/1.7.0/ember',
		'jquery.ui': 'libs/jquery.ui/1.11.1/jquery-ui',
		'bootstrap': 'libs/bootstrap/3.2.0/js/bootstrap',
		'sweetAlert': 'libs/sweetalert-master/sweet-alert.min',
		'fabric': 'libs/fabric/fabric',
		/*requirejs-plugins*/
		'text': 'libs/requirejs-plugins/text',
		'hbs': 'libs/requirejs-plugins/hbs',
		'domReady': 'libs/requirejs-plugins/domReady'
	},
	/*hbs plugin options*/
	hbs: {
		disableI18n: true,
		templateExtension: "html"
	},

});
