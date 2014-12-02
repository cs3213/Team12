define([
	"ember",
	"controllers/canvasController",
	"text!templates/canvasTemplate.html"
	], function(Ember, canvasController,canvasTemplate) {
	//console.log("inside top of canvasView: ", document.getElementById("myCanvas"));//null because not yet rendered
	var canvasV = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(canvasTemplate),
		controller: canvasController,
		didInsertElement: function() {
			//alert("HAHAAHcanvas");
			var tmpData;
			var self= this;
			this.controller.initialize({"height":600, "width":$("#myCanvas").parent().width()});
			this.controller.startMousePositionWatch();
			$("#canvasLabel").html($("#myCanvas").parent().width()+"X"+"600");
			//console.log("try selection of canvas element in View", document.getElementById("myCanvas"));
			window.COINCIDE.canvasController = this.controller;
			//window.COINCIDE.canvasController.createCharacter("Jim", {x_pos:200, y_pos:200, angle: 0, profile_pic_url:"http://graph.facebook.com/yifan.xing1/picture"});
            
            /*setTimeout(function(){
				 tmpData = JSON.stringify(window.COINCIDE.canvasController.saveToJSON({}));
				 window.COINCIDE.canvasController.clearCanvas();
				 setTimeout(function(){ 
				 	window.COINCIDE.canvasController.loadFromJSON(JSON.parse(tmpData));
				 }, 10000);
			}, 1000)*/

	      /*  var canvasData =  '{"objects":[{"type":"group","originX":"center","originY":"center","left":185,"top":355,"width":335,"height":300,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","objects":[{"type":"image","originX":"center","originY":"center","left":0,"top":0,"width":335,"height":300,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"http://test.com:8000/static/img/costume0.png","filters":[],"crossOrigin":""},{"type":"circle","originX":"center","originY":"center","left":15,"top":-55,"width":60,"height":60,"fill":{"source":"http://graph.facebook.com/yifan.xing1/picture?width=60&height=60","repeat":"no-repeat","offsetX":0,"offsetY":0},"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","radius":30,"startAngle":0,"endAngle":6.283185307179586}],"id":0,"dir":"left"}],"background":"#F0F8FF","backgroundImage":{"type":"image","originX":"left","originY":"top","left":0,"top":0,"width":654,"height":600,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"http://test.com:8000/static/img/mystery.png","filters":[],"crossOrigin":""}}' ;
		    var data ={"characters":[],
	        "idMap" : {},
	        "curId": [],
	        "canvas":canvasData,
	        "imgMap" : {},
	        "randomBackgroundImageArr":[],
	        "costumeMatric":[],
	        "costumeId":null,
	        "TOTALNUMCHARACTER":3,
	        };
			setTimeout( function(){
				self.controller.loadFromJSON(data);
			},3000);*/

			/*setTimeout(function(){
				 window.COINCIDE.canvasController.moveCharacter("Jim", {direction:"right", distance:50});
				 setTimeout(function(){ 
				 	window.COINCIDE.canvasController.setCharacterPosition_X("Jim", {x_pos:400});
				 	//window.COINCIDE.canvasController.setCharacterPosition_Y("Jim", {y_pos:300});
				    setTimeout(function(){
						//window.COINCIDE.canvasController.changeCharacter("Jim",{costume: "superman"});	
						window.COINCIDE.canvasController.changeCharacter("Jim");

						}, 1000);

				 }, 1000);
			}, 1000)*/
			
		}
	});

	return canvasV;
});