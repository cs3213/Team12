define(['fabric'], function(fabric) {
	//console.log('in canvas controller:', fabric);

    var canvasController = {

        characters:  [],
        idMap : {},
        curId: 0,
        canvas:null,
        imgMap : {},
        randomBackgroundImageArr:[],
        costumeMatric:[],
        costumeId:0,
        TOTALNUMCHARACTER:3,
        hidedCharacters:[],
        curBackgroundLink: null,
        clockId: 0,
        clocks: [],
        clockMap: {},
        currentMousePosition:{},

        initialize : function(params) {
		    //console.log(document);
		   // console.log("The cavnas Dom: ", document.getElementsByClassName("canvasClass"));
		   // var canvasDM = document.getElementsByClassName("canvasClass").get(0);
		    //console.log(canvasDM);
			// takes in a DOM, height and width. Create canvas in that DOM with that dimention
			var height = params.height ? params.height : 500;
			var width = params.width ? params.width : 400;

			this.canvas = new fabric.Canvas('myCanvas');
			this.canvas.setDimensions({width:width, height:height});
			this.canvas.setBackgroundColor('#F0F8FF', this.canvas.renderAll.bind(this.canvas));
			//console.log(this.canvas.width, this.canvas.height);
			//console.log($("#myCanvas").attr('id'));
			//$('.canvas-container').css({float:"left"});
			//create some backgrounds
			this.imgMap["deflt"]=this.canvas.backgroundImage;
			this.randomBackgroundImageArr.push(null);
			this.curBackgroundLink = null;
			fabric.Image.fromURL('./static/img/delight.png', $.proxy(function(oImg) {
               oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
               this.imgMap["delight"] =oImg;
               this.randomBackgroundImageArr.push(oImg.getSrc());
               //console.log(this.randomBackgroundImageArr);
            },this));
            fabric.Image.fromURL('./static/img/mystery.png', $.proxy(function(oImg) {
               oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
               this.imgMap["mystery"] =oImg;
               this.randomBackgroundImageArr.push(oImg.getSrc());
               //console.log(this.randomBackgroundImageArr);
            }, this));
            fabric.Image.fromURL('./static/img/nature.png', $.proxy(function(oImg) {
               //oImg.scaleToHeight(this.canvas.height);
               //oImg.scaleToWidth(this.canvas.width);
               oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
               this.imgMap["nature"] =oImg;
               this.randomBackgroundImageArr.push(oImg.getSrc());
            //console.log(this.imgMap);
            //console.log(this.randomBackgroundImageArr);
            }, this));
            this.costumeMatric.push({"scale":1, "relativePosY":55,"relativePosX":-15, "dir":"left"});//this is for costume0
            this.costumeMatric.push({"scale":0.4, "relativePosY":40,"relativePosX":25,"dir":"right"});// costume 1
            this.costumeMatric.push({"scale":0.6, "relativePosY":50,"relativePosX":50,"dir":"right"});// costume 2
            fabric.Object.prototype.hideOb = function(){
            	this.set({opacity:0});
            };
            fabric.Object.prototype.showOb = function (){
            	this.set({opacity: 1});
            };
	    },

		createCharacter: function(name, params) {
		
			var x_pos = params.x_pos ? params.x_pos : 1;
			var y_pos = params.y_pos ? params.y_pos : 1;
			var angle = params.angle ? params.angle : 0;
			var profile_pic_url = params.profile_pic_url ? params.profile_pic_url : '';
		    // create a wrapper around native canvas element (with id="c")
			//create the body
			fabric.Image.fromURL('./static/img/costume'+this.costumeId+'.png', $.proxy(function (body) {
	            body.scale(this.costumeMatric[this.costumeId].scale).set({
	                left: this.costumeMatric[this.costumeId].relativePosX,
	                top: this.costumeMatric[this.costumeId].relativePosY,
	                originX:'center',
	                originY:'center'
	            });
		        // create the head
		        var head = new fabric.Circle({
				//left: 0,
				//top: 0,
				fill: 'none',
				radius:30,
				scaleX:0.9,
				centeredRotation:true,
				originX:'center',
				originY:'center'
			    });
				//TO DO: may need to change the source size of the image. so that it can fit inside the circle of 'face'
				fabric.util.loadImage(profile_pic_url+"?width=60&height=60", $.proxy(function(img) {
				head.setPatternFill({
				source: img,
				repeat: 'no-repeat',
				});
				//create the final character
				var group = new fabric.Group([ body, head ], {
				id:this.curId,
				angle:angle,
				left:x_pos+ this.costumeMatric[this.costumeId].relativePosX,
	            top:y_pos+ this.costumeMatric[this.costumeId].relativePosY,
				originX:'center',
				originY:'center',
				dir:this.costumeMatric[this.costumeId].dir
				});
				this.idMap[name]=this.curId++;
				fabric.Group.prototype.toObject = (function (toObject) {
				  return function() {
				    return fabric.util.object.extend(toObject.call(this), {
				      id:this.id,
				      dir:this.dir
				    });
				  };
				}) ( fabric.Group.prototype.toObject);

				group.set('left',x_pos);// adjust position after create to meet user specific
				group.set('top',y_pos);

				this.canvas.renderAll();
				this.canvas.add(group);
				//push into character array
				this.characters.push(group);
				//console.log(this.characters);
				console.log("Head:");
				console.log(group.item(1));
				console.log("body:");
				console.log(group.item(0));
				console.log("group:")
				console.log(group);
				}, this));

            }, this));
			/*var body = new fabric.Circle({
			left:x_pos,
			top:y_pos,
			radius: 100,
			fill: 'red',
			scaleY: 0.5,
			originX: 'center',
			originY: 'center',
			borderColor:'red'
			});*/


			/*
			var radius= 100;
			fabric.Image.fromURL('./static/img/delight.png', $.proxy(function (img) {
            console.log(img);
            img.scale(0.5).set({
                left: 100,
                top: 100,
                clipTo:function(ctx){
                    ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
                }
            });

                this.canvas.add(img);

            }, this));

			 var self = this;
			  (function animate() {
			    fabric.util.animate({
			     startValue: Math.round(radius) === 50 ? 50 : 300,
			     endValue: Math.round(radius) === 50 ? 300 : 50,
			     duration: 1000,
			     onChange: function(value) {
			        radius = value;
			        self.canvas.renderAll();
			     },
			     onComplete: animate
			    });
			  })();*/

			
			
		},
		updateRecord: function(name, obj){
			var thisId = this.idMap[name];
			for(var i=0; i< this.characters.length;i++)
			{
				if(this.characters[i].id == thisId)
				{
					this.characters[i] = obj;
					//console.log("updated object:");
					//console.log(this.characters[i]);
					break;
				}
			}
		},

		moveHelper: function(name, params, isBlink) {
			var self = this;// hacking of variable scope
			var dir= params.direction? params.direction:"right";
			var distance= params.distance? params.distance : 100; //default 200
			var id = this.idMap[name];
			var objects = this.canvas.getObjects();
			var myshape;
			var needSlowDown = false;
			//console.log("array of objects size: "+this.canvas.getObjects().length);
			for (var i=0;i< objects.length;i++)
			{
				if (objects[i].id == id)
				{
					myshape = objects[i];
				}
			}
		    if(dir  == "left" )
		    {
		    	//for left and right, check whether need to flip
		    	if(myshape.dir != dir) 
		    	{
		    		//console.log(myshape.dir);
		    		//console.log(myshape.getFlipX());
	    			if(myshape.getFlipX()== false)
	    			   myshape.setFlipX(true);
	    		    else
	    			   myshape.setFlipX(false);
	    			myshape.dir= dir;
		    	}
		    	if(!isBlink)
		    	{
		    		if(myshape.left-distance >= 0)
					    myshape.animate('left', '-='+distance, {
							onChange: this.canvas.renderAll.bind(this.canvas),
							duration: 500
			      		});
					else
					{
   						var targetPosition = this.canvas.width+myshape.left-distance;
						(function animate() {
						  myshape.left += -1;
						  if (myshape.left < 0) {
						    myshape.set('left', self.canvas.width);
						  }
						  if(myshape.left == targetPosition)
						 	return;

						  self.canvas.renderAll();
						  fabric.util.requestAnimFrame(animate);
						})();
						needSlowDown = true;
					}
				}
				else
				{
					if(myshape.left-distance >=0)
					    myshape.set('left', myshape.left-distance);
				    else
				    	myshape.set('left', this.canvas.width+myshape.left-distance);
					this.canvas.renderAll();
				}
			}
		    else if(dir == "right")
		    {
		    	//for left and right, check whether need to flip
		    	if(myshape.dir != dir) 
		    	{
		    		//console.log(myshape.dir);
		    		//console.log(myshape.getFlipX());
	    			if(myshape.getFlipX()== false)
	    			  myshape.setFlipX(true);
	    		    else
	    			  myshape.setFlipX(false);
	    			myshape.dir= dir;
		    	}

		    	if(!isBlink)
		    	{
		    		if(myshape.left+distance<= this.canvas.width)
						myshape.animate('left', '+='+distance, {
								onChange: this.canvas.renderAll.bind(this.canvas),
								duration: 500
						});
				    else
				    {
				    	// TODO: how to adjust speed of the animeFrame without being ending with a different position compared to blink
				    	//if no need same ending position as blink, then set each time position -=3, and , if(myshape.left >= targetPosition-3 && myshape.left <= targetPosition)return
				    	var targetPosition = myshape.left+distance-this.canvas.width;
						(function animate() {
						  myshape.left += 1;
						  if (myshape.left > self.canvas.width) {
						    myshape.set('left', 0);
						  }
						  if(myshape.left == targetPosition)
						 	return;

						  self.canvas.renderAll();
						  fabric.util.requestAnimFrame(animate);
						})();
						needSlowDown = true;
				    }
			    }
			    else
			    {

			    	if(myshape.left+distance <= this.canvas.width)
					    myshape.set('left', myshape.left+distance);
				    else
				    	myshape.set('left', myshape.left+distance-this.canvas.width);
					this.canvas.renderAll();
			    }

		    }
			else if(dir == "down")
			{
				if(!isBlink)
				{
					if(myshape.top+distance <= this.canvas.height)
						myshape.animate('top', '+='+distance, {
								onChange: this.canvas.renderAll.bind(this.canvas),
								duration: 500
						});
					else
					{
				    	var targetPosition = myshape.top+distance-this.canvas.height;
						(function animate() {
						  myshape.top += 1;
						  if (myshape.top > self.canvas.height) {
						    myshape.set('top', 0);
						  }
						  if(myshape.top == targetPosition)
						 	return;

						  self.canvas.renderAll();
						  fabric.util.requestAnimFrame(animate);
						})();	
						needSlowDown = true;
					}
				}
			    else 
			    {
			    	if(myshape.top+distance <= this.canvas.height)
					    myshape.set('top', myshape.top+distance);
				    else
				    	myshape.set('top', myshape.top+distance-this.canvas.height);
					this.canvas.renderAll();
			    }
		    }
			else// if move up
			{
				if(!isBlink)
				{
					if(myshape.top-distance >=0)
						myshape.animate('top', '-='+distance, {
								onChange: this.canvas.renderAll.bind(this.canvas),
								duration: 500
						});
				    else
				    {
				    	var targetPosition = this.canvas.height+myshape.top-distance;
						(function animate() {
						  myshape.top += -1;
						  if (myshape.top < 0) {
						    myshape.set('top',self.canvas.height);
						  }
						  if(myshape.top == targetPosition)
						 	return;

						  self.canvas.renderAll();
						  fabric.util.requestAnimFrame(animate);
						})();	
						needSlowDown = true;
				    }
				}
				else
				{
					//console.log(myshape.top-distance);
					if(myshape.top-distance >=0)
					    myshape.set('top', myshape.top-distance);
				    else
				    	myshape.set('top', this.canvas.height+myshape.top-distance);
					this.canvas.renderAll();
				}
		    }
		   this.updateRecord(name, myshape);
		   return needSlowDown;
		},

		moveCharacter: function (name, params){
			return this.moveHelper(name, params, 0);
		},

		blinkCharacter:function(name, params){
			this.moveHelper(name, params, 1);
		},

		rotateCharacter: function(name, params) {
			var curObj= this.findObject(name);
			var direction = params.direction?params.direction:"clockwise";
			//console.log(curObj.originX);
			//console.log(curObj.originY);
			//curObj.set('originX','left');
			//curObj.set('originY','right');
			curObj.set('centeredRotation', true);
			var angle = params.angle? params.angle : curObj.angle;// default is 45 degree
			if(direction == "clockwise")
				curObj.animate('angle', curObj.angle+angle, {
						onChange: this.canvas.renderAll.bind(this.canvas),
						duration: 500
				});
		    else
		    	curObj.animate('angle', curObj.angle-angle, {
				onChange: this.canvas.renderAll.bind(this.canvas),
				duration: 500
			});
			this.updateRecord(name, curObj);
		},

		deleteCharacter: function(name, params) {
			var curObj = this.findObject(name);
			this.canvas.remove(curObj);
			for(var i=0;i<this.characters.length;i++)
			{
				if(curObj.id == this.characters[i].id)
					this.characters.splice(i,1);
			}
			console.log(this.characters);
		},

		changeCharacter: function(name, params) {
			//TO DO: character moves a bit when change costume at a non zero angle
			var curObj= this.findObject(name);
			var originLeft = curObj.left;
			var originTop = curObj.top;
			var originAngle= curObj.angle;
			var originId= curObj.id;
			var originDir= curObj.dir;
			//console.log("originLeft:" +originLeft);
			//console.log("originTop:" + originTop);

			var originHead= curObj.item(1);
			var originBody= curObj.item(0);
			var headLeft= originHead.left;
			var headTop = originHead.top;
			//console.log("headleft:" + headLeft);
			//console.log("headtop" + headTop);
			//curObj._restoreObjectsState();
		    this.deleteCharacter(name,params);//delete the current one and redraw
		    if(this.costumeId<this.TOTALNUMCHARACTER-1)this.costumeId++;//currently in total of 3 characters
		    else this.costumeId = 0;
		    //the new body
		    fabric.Image.fromURL('./static/img/costume'+this.costumeId+'.png', $.proxy(function (newbody) {
	            newbody.scale(this.costumeMatric[this.costumeId].scale).set({
	                left: this.costumeMatric[this.costumeId].relativePosX,
	                top: this.costumeMatric[this.costumeId].relativePosY,
	                originX:'center',
	                originY:'center'
	            });

	            originHead.set("left", 0);
	            originHead.set("top", 0);

	            var group = new fabric.Group([ newbody, originHead ], {
				id:originId,
				angle:originAngle,
			    left: originLeft+ headLeft +this.costumeMatric[this.costumeId].relativePosX,
	            top: originTop + headTop +this.costumeMatric[this.costumeId].relativePosY,
	            originX:'center',
	            originY:'center',
	            dir:this.costumeMatric[this.costumeId].dir
				});

				this.canvas.renderAll();
				this.canvas.add(group);
				//push into character array
				this.characters.push(group);
				//console.log(this.characters);

			}, this));

		},

		saveToJSON: function(params) {
			// save everything, the entire current canvas to a JSON string so that we can save to DB
			// use JSON.stringify

			//console.log(this.canvas.toJSON());
			var canvasData = this.canvas.toJSON();

		    var data ={"characters":this.characters,
	        "idMap" : this.idMap,
	        "curId": this.curId,
	        "canvas":JSON.stringify(canvasData),
	        "imgMap" : this.imgMap,
	        "randomBackgroundImageArr":this.randomBackgroundImageArr,
	        "costumeMatric":this.costumeMatric,
	        "costumeId":this.costumeId,
	        "TOTALNUMCHARACTER":this.TOTALNUMCHARACTER,
	        };

			return data;
		},

		loadFromJSON: function(JSONData, params) {
			// load from a JSON string, and render back the previous status, as depicted by the JSON object
			// use JSON.parse
			this.canvas.clear();
			var self = this;
			//console.log(JSON.stringify(JSONData));
			//console.log("JSON canvas data passed inside:");
			var canvasData = JSONData.canvas;
			//console.log(canvasData);
			//this.canvas = new fabric.Canvas();// clear and render a new one
			//console.log("the new canvas:");
			//console.log(this.canvas.toObject());
			
			//this.canvas.loadFromJSON('{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(1, 1, 1, 1)"}');
			this.canvas.loadFromJSON(canvasData, $.proxy(function(){
				this.canvas.renderAll();
				//console.log("after render:");
			    //console.log(this.canvas.toObject());
			    var objs = this.canvas.getObjects();
			    for(var i=0;i<objs.length;i++)
			    {
			    	//console.log(objs[i]._objects);
			    	if(objs[i]._objects && objs[i]._objects.length == 2) // is our characters with user profile
			    	{
			    		var profile = objs[i]._objects[1];
			    		//console.log("src is ", document.getElementById("profile").src)
					    fabric.util.loadImage("http://graph.facebook.com/bimlesh.wadhwa/picture/?width=60&height=60", function(img) {
					    //console.log(img);
						profile.setPatternFill({
						source: img,
						repeat: 'no-repeat',
						});

						self.canvas.renderAll();
					  });
			    	}
			    }
			}, this));
			
			this.characters=JSONData.characters;
	        this.idMap=JSONData.idMap;
	        this.curId= JSONData.curId;
	        this.imgMap=JSONData.imgMap;
	        this.randomBackgroundImageArr=JSONData.randomBackgroundImageArr;
	        this.costumeMatric=JSONData.costumeMatric;
	        this.costumeId=JSONData.costumeId;
	        this.TOTALNUMCHARACTE=JSONData.TOTALNUMCHARACTER;
		},
		findObject: function (name){
			var id = this.idMap[name];
			if (id == null) return null;
			var objs= this.canvas.getObjects();
			for(var i=0;i< objs.length;i++)
			{
				if(objs[i].id == id)
					return objs[i];
			}
			return null;
		},
		changeBackGround: function(){
			var curBackground= this.canvas.backgroundImage;
			for (var i =0;i< this.randomBackgroundImageArr.length;i++)
			{
				if(this.randomBackgroundImageArr[i] == this.curBackgroundLink)
				{

					 fabric.Image.fromURL(i == this.randomBackgroundImageArr.length-1? this.randomBackgroundImageArr[0]: this.randomBackgroundImageArr[i+1], $.proxy(function(oImg) {
	                    oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
						this.canvas.setBackgroundImage(oImg, this.canvas.renderAll.bind(this.canvas),{// set to the next background image ie, background 1
							originX:'left',
							originY:'top'
						});
						this.curBackgroundLink = oImg.getSrc();
			        },this));
					break;
				}
			}
		},
		changeBackGroundTargeted: function(params){
			var target= params.style ? params.style: deflt;// otherwise default
			console.log(target);
			this.canvas.setBackgroundImage( this.imgMap[target], this.canvas.renderAll.bind(this.canvas),{
				originX:'left',
				originY:'top'
			});
		},
		clearCanvas: function () {
			this.canvas.clear();
			$('#canvas-var-display').html('');
		},
		hideCharacter: function (name){
			var thisobj = this.findObject(name);
		    if(thisobj == null) return false;
		    /*this.hidedCharacters.push(thisobj);
		    this.canvas.remove(thisobj);*/
		    //console.log(thisobj.originalState);
		    //thisobj.originalState.set({opacity: 0});
		    thisobj.hideOb();
		    this.canvas.renderAll();

		} ,
		showCharacter: function (name){
			/*var id = this.idMap[name];
			for(var i=0;i< this.hidedCharacters.length;i++)
			{
				if(id == this.hidedCharacters[i].id)
				{
					this.canvas.add(this.hidedCharacters[i]);
					this.canvas.renderAll();
					this.hidedCharacters.splice(i,1);
				}

			}*/
			var thisobj = this.findObject(name);
		    if(thisobj == null) return false;
		    thisobj.showOb();
		    this.canvas.renderAll();
		},
		setCharacterPosition_X: function (name, params){
			var left= params.x_pos;
			var obj = this.findObject(name);
			obj.set('left',left);
			this.canvas.renderAll();
			this.updateRecord(name, obj);
		},
		setCharacterPosition_Y: function (name, params){
			var top= params.y_pos;
			var obj = this.findObject(name);
			obj.set('top', top);
			this.canvas.renderAll();
			this.updateRecord(name, obj);
		},
		getCharacterX: function(name){
			var obj = this.findObject(name);
			return obj.left;
		},
		getCharacterY: function(name){
			var obj = this.findObject(name);
			return obj.top;
		},
		startMousePositionWatch:function(){
			//console.log("haha", this.canvas);
			var self = this;
			this.canvas.on('mouse:move', function(options){
	   			self.currentMousePosition = self.getMouse(options);// its not an event its options of your canvas object
			});
		},

		getMouse : function(options) {
		    //console.log(options);// you can check all options here
		    //console.log(options.e.clientX);
		    //console.log({X:options.e.clientX-this.canvas._offset.left, Y:options.e.clientY-this.canvas._offset.top});
		    return {X:options.e.clientX-this.canvas._offset.left, Y:options.e.clientY-this.canvas._offset.top};
		},
		getMousePosition:function(){
			return this.currentMousePosition;
		},


		findClock: function(name) {
			for (var i = this.clocks.length - 1; i >= 0; i--) {
				if(this.clocks[i].name == name)
					return this.clocks[i];
			}
			return null;
		},
		createClockFace: function (name, params) {
			var x_pos = params.x_pos ? params.x_pos : 1;
			var y_pos = params.y_pos ? params.y_pos : 1;
			fabric.Image.fromURL('./static/img/clock.png', $.proxy(function (clock){		
				clock.scale(1.0).set({
					left: x_pos,
					top: y_pos,
					name: name,
					hour: null,
					minute: null,
					second: null,
				});

				this.clocks[this.clockId] = clock;
				this.clockMap[name] = this.clockId;
				//console.log("clockId: "+this.clockId);
				//console.log("clockname: "+name);
				this.clockId++;
				this.canvas.add(clock);
				this.canvas.renderAll();
	        },this));
		},
		createClockHands: function (name, params){
			var self = this;
			//console.log("clocks.size() = "+this.clocks.length);
			var hand = params.hand;
			var angle = params.angle ? params.angle:0;
			var curClock = this.findClock(name);
			var center = new fabric.Point(
				curClock.left+(curClock.width/2 + 1),
				curClock.top+(curClock.height/2)
			);			
			fabric.Image.fromURL('static/img/'+hand.toLowerCase()+'.png', $.proxy(function (chosenHand){
				chosenHand.scale(1.0).set({
					left: center.x, 
					top: center.y,
					originX: 'left',
					originY: 'bottom',
					angle: angle,
				});
				chosenHand.set('centeredRotation', false);
				fabric.util.rotatePoint(new fabric.Point(center.x, center.y), center, fabric.util.degreesToRadians(angle));
				//console.log('chosenHand', chosenHand);
				if(curClock[hand.toLowerCase()] == null) // one clock can only have one hand of each type
				{
					this.canvas.add(chosenHand);
					curClock[hand.toLowerCase()] = chosenHand;
					this.canvas.renderAll();
				}

				//update the current clock in the canvas records
				var id = self.clockMap[name];
				self.clocks[id] = curClock;
			},this));

		},
		rotateClockHands: function (name, params){
			var curClock = this.findClock(name);
			var hand = params.hand.toLowerCase();
			var angle = params.angle ? params.angle:0;
			console.log(curClock);
			console.log(hand);
			var chosenHand = curClock[hand];
			//console.log("to be rotated clock.hand.angle: "+curClock.hand.angle);
			//console.log("loaded angle"+chosenHand.angle);
			chosenHand.animate('angle', chosenHand.angle+angle, {
				onChange: this.canvas.renderAll.bind(this.canvas),
				duration: 0
			});
			//update the hand and the clock objects in the canvas data
			curClock[hand] = chosenHand;
			var id = this.clockMap[name];
			this.clocks[id] = curClock;
			//console.log("rotated clock.hand.angle: "+this.clocks[id].hand.angle);
		},
		printVariable: function(variableName, value) {
			$('#canvas-var-display').append('<span>&nbsp;&nbsp;&nbsp;'+variableName+': '+value+'</span><br>');
		}
	};
   
   	/*	(function(params) {
		    //console.log(document);
		   // console.log("The cavnas Dom: ", document.getElementsByClassName("canvasClass"));
		   // var canvasDM = document.getElementsByClassName("canvasClass").get(0);
		    //console.log(canvasDM);
			// takes in a DOM, height and width. Create canvas in that DOM with that dimention
			var height = params.height ? params.height : 500;
			var width = params.width ? params.width : 400;

			this.canvas = new fabric.Canvas('myCanvas');
			this.canvas.setDimensions({width:width, height:height});
			this.canvas.setBackgroundColor('#F0F8FF', this.canvas.renderAll.bind(this.canvas));
			console.log(this.canvas.width, this.canvas.height);
			//console.log($("#myCanvas").attr('id'));
			//$('.canvas-container').css({float:"left"});
			//create some backgrounds
			this.imgMap["deflt"]=this.canvas.backgroundImage;
			this.randomBackgroundImageArr.push(null);
			this.curBackgroundLink = null;
			fabric.Image.fromURL('./static/img/delight.png', $.proxy(function(oImg) {
               oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
               this.imgMap["delight"] =oImg;
               this.randomBackgroundImageArr.push(oImg.getSrc());
               console.log(this.randomBackgroundImageArr);
            },this));
            fabric.Image.fromURL('./static/img/mystery.png', $.proxy(function(oImg) {
               oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
               this.imgMap["mystery"] =oImg;
               this.randomBackgroundImageArr.push(oImg.getSrc());
               console.log(this.randomBackgroundImageArr);
            }, this));
            fabric.Image.fromURL('./static/img/nature.png', $.proxy(function(oImg) {
               //oImg.scaleToHeight(this.canvas.height);
               //oImg.scaleToWidth(this.canvas.width);
               oImg.set({width:this.canvas.width, height:this.canvas.height, originX: 'left', originY: 'top'});
               this.imgMap["nature"] =oImg;
               this.randomBackgroundImageArr.push(oImg.getSrc());
            console.log(this.imgMap);
            console.log(this.randomBackgroundImageArr);
            }, this));
            this.costumeMatric.push({"scale":1, "relativePosY":55,"relativePosX":-15, "dir":"left"});//this is for costume0
            this.costumeMatric.push({"scale":0.4, "relativePosY":40,"relativePosX":25,"dir":"right"});// costume 1
            this.costumeMatric.push({"scale":0.6, "relativePosY":50,"relativePosX":50,"dir":"right"});// costume 2
	   }).call(canvasController, {"height":600, "width":$("#myCanvas").parent().width()});*/






    return canvasController;
});