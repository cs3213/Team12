define([
  "models/ProgramModel"
], function(ProgramModel){

	var programController = Em.ArrayController.createWithMixins({
		programObj: [],

	});

	return programController;
});