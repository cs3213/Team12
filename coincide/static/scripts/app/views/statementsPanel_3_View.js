define([
	"ember",
	"text!templates/statementsPanelTemplate.html", // redundant, not used
	//"views/statementCreateView",
	//"views/statementSetXYView",
	//"views/statementMoveView",
	//"views/statementShowCharView",
	//"views/statementHideCharView",
	//"views/statementChangeCostumeView",
	//"views/statementChangeBackgroundView",
	//"views/statementCreateClockHandsView",
	//"views/statementRotateClockHandsView",


	//"views/statementAssignVariableView",
	//"views/statementMathView",
	//"views/statementBooleanExpView",
	//"views/statementBooleanOperationView",
	//"views/statementBooleanNotView",
	
	"views/statementOpenRepeatView",
	"views/statementCloseRepeatView",
	"views/statementOpenForView",
	"views/statementCloseForView",
	"views/statementOpenWhileView",
	"views/statementCloseWhileView",
	"views/statementOpenIfView",
	"views/statementElseView",
	"views/statementCloseIfView",

	"views/statementRecycleView",	
], function(
	Ember, 
	statementsPanelTemplate, 
	//create,  
	//setxy, 
	//move, 
	//showChar, 
	//hideChar, 
	//changeCostume, 
	//changeBackground, 
	//createClockHands, 
	//rotateClockHands, 


	//assignVariable, 
	//math,
	//booleanExp, 
	//booleanOp, 
	//booleanNot, 

	openrepeat, 
	closerepeat, 
	openfor, 
	closefor, 
	openwhile, 
	closewhile, 
	openIf, 
	elsev,
	closeIf, 
	recycle ) {

	var statementDict = {
		//create: create,
		//setxy: setxy,
		//move: move,
		//showChar: showChar,
		//hideChar: hideChar,
		//changeCostume: changeCostume,
		//changeBackground: changeBackground,
		//createClockHands: createClockHands,
		//rotateClockHands: rotateClockHands,
		//assignVariable: assignVariable,
		//math: math,
		//booleanExp: booleanExp,
		//booleanOp: booleanOp,
		//booleanNot: booleanNot,	
		openrepeat: openrepeat,
		closerepeat: closerepeat,
		openfor: openfor,
		closefor: closefor,
		openwhile: openwhile,
		closewhile: closewhile,
		openIf: openIf,
		elsev: elsev,
		closeIf: closeIf,
		recycle: recycle,
	};
	
	var options = {
		tagName: 'div',
		classNames: ["statement-panel", "statements-list"],
		childViews: Object.keys(statementDict),
		defaultTemplate: Ember.Handlebars.compile(statementsPanelTemplate),
		didInsertElement: function() {
			var self = this;
			window.view = self;
			this.$('div div').not('.recycle').draggable({
				containment: ".statement-panel-program-div",
				// appendTo: ".statement-panel-program-div",
				cursor: "pointer", 
				delay: 100,
				distance: 5,
				revert: "invalid",
				revertDuration: 200,
				// cursorAt: { top: '56%', left: '56%' }, // percentage not supported
				scroll: true,
				helper: "clone",
				scope: 'program',
				connectToSortable: '.program',
				zIndex: 100,
				cancel: 'input, select',
				
			});
		},
	};
	
	for (var property in statementDict) {
		options[property] = statementDict[property].parent.create();
	}

	var statementsPanelView = Ember.ContainerView.extend(options);

	statementsPanelView.statementDict = statementDict;

	return statementsPanelView;
});