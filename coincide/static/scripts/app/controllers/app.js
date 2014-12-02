$(function(){
	var chars = [];
	var declaredVariables = [];
	var variableMap = [];
	var stopAll = false;

	$("#musicControl").click(function(e){
		e.preventDefault();
		var a = document.getElementById("bgSound");
		a.currentTime = 0;
		console.log(a.paused);
		if (!a.paused) {
			console.log("isPlaying");
            a.pause();
        } else {
        	console.log("stopped");
        	a.load();
        	a.play();
       	}
	});

	$("#stop-button").click(function(e){
		e.preventDefault();
		stopAll = true;
	});

	$("#run-button").click(function(e){
		e.preventDefault();

		var bgMusic = document.getElementById("bgSound");
		var clockMusic = document.getElementById("clockSound");
		bgMusic.load();
		bgMusic.pause();
		clockMusic.load();
		
		stopAll = false;

		chars = [];
		var result = getAllStatements();
		var validate = result.validate;
		var statements = result.data;

		//validate all statements
		if (!validate) {
			alert("Please check your inputs");
		} 
		//match open and close loop bracket
		else {
			var result = checkBrackets(statements);
			//loop brackets are mis-matched
			if (!result.validate) {
				alert("mis-matched brackets");
				return;
			}
			//execute the statements
			else {
				var finalStaments = result.data;
				console.log("final statements", finalStaments);
				window.COINCIDE.canvasController.clearCanvas();
				executeStatements(finalStaments, 0);
			}
		}
	});

	function getAllStatements() {
		var validate = true;
		var statements = [];
		/*
		$(".program .statement-div").each(function(){
		*/
		$(".program").children(".statement-div").each(function(){
			var className = $(this).attr("class");

			if (className.indexOf("create-object") >= 0) {
				var object = $(this).find(".createObject-object").val();
				var name = $(this).find(".createObject-name").val();
				// var x = $(this).find(".createObject-x");
				// var y = $(this).find(".createObject-y");
				var x = $(this).children().eq(2);
				var y = $(this).children().eq(3);

				if (name == "" || !checkVariableDeclareAndField(x) || !checkVariableDeclareAndField(y) || checkDuplicate(name)) {
					validate = false;
				} else {
					chars.push(name);
					var statement = {
						type: "create-object",
						object: object,
						name: name,
						x: x,
						y: y
					};
					statements.push(statement);
				}
			}
			else if(className.indexOf("set-xy") >= 0) {
				var name = $(this).find(".setXY-name").val();
				var axis = $(this).find(".setXY-axis").val();
				var val = $(this).find(".setXY-val");

				if (name == "" || !checkVariableDeclareAndField(val) || !checkDuplicate(name)) {
					validate = false;
				} else {
					var statement = {
						type: "set",
						name: name,
						axis: axis,
						value: val
					};
					statements.push(statement);
				}
			}
			else if(className.indexOf("show-char") >= 0) {
				var name = $(this).find(".showChar-name").val();

				if (name == "" || !checkDuplicate(name)) {
					validate = false;
				} else {
					var statement = {
						type: "show",
						name: name
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("hide-char") >= 0) {
				var name = $(this).find(".hideChar-name").val();

				if (name == "" || !checkDuplicate(name)) {
					validate = false;
				} else {
					var statement = {
						type: "hide",
						name: name
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("change-costume") >= 0) {
				var name = $(this).find(".changeCostume-name").val();

				if (name == "" || !checkDuplicate(name)) {
					validate = false;
				} else {
					var statement = {
						type: "changeCostume",
						name: name
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("change-background") >= 0) {
				var statement = {
					type: "changeBackground"
				};
				statements.push(statement);
			} 
			else if(className.indexOf("move") >= 0) {
				var name = $(this).find(".move-name").val();
				var direction = $(this).find(".move-direction").val();

				if (name == "" || !checkDuplicate(name)) {
					validate = false;
				} else {
					var statement = {
						type: "move",
						name: name,
						direction: direction
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("open-repeat") >= 0) {
				var times = $(this).find(".openRepeat-times").val();

				
				if (times == "" || parseInt(times) == NaN) {
					validate = false;
				} else {
					var statement = {
						type: "open-repeat",
						time: times
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("close-repeat") >= 0) {
				var statement = {
					type: "close-repeat"
				};
				statements.push(statement);
			}
			else if(className.indexOf("assign-variable") >= 0){
				var dom = $(this).children()[1];// the second child may be an complex expression
				var newVariable = $(this).find(".variable").val().trim();
				var result = addNewVariable(newVariable, dom);
				if (result.valid) {
					statements.push(result.data);
				}
				validate = result.valid;
			} 
			else if(className.indexOf("boolean-exp") >= 0){
				/*var lhs = $(this).children()[0];
				var operator = $(this).children()[1];
				var rhs = $(this).children()[2];

				validate = checkVariableDeclareAndField(lhs) && checkVariableDeclareAndField(rhs);*/
				var dom = this;
				validate = checkVariableDeclareAndField(this);
				if(validate){
					var statement = {
						type: "boolean-exp",
						content:dom
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("create-clock-hands") >= 0){
				var clock = $(this).find(".createClockHands-name").val();
				var hand = $(this).find(".createClockHands-hand").val();
				var angle = $(this).find(".createClockHands-angle").val();
				if (angle == "" || parseInt(angle) == NaN)
					validate = false;
				else{
					var statement = {
						type: "createClockHands",
						name: clock,
						hand: hand,
						angle: angle,
					};
					statements.push(statement);
				}
			} 
			else if(className.indexOf("rotate-clock-hands") >= 0){
				var clock = $(this).find(".rotateClockHands-name").val();
				var hand = $(this).find(".rotateClockHands-hand").val();
				var angle = $(this).find(".rotateClockHands-angle").val();
				if (angle == "" || parseInt(angle) == NaN)
					validate = false;
				else{
					var statement = {
						type: "rotateClockHands",
						name: clock,
						hand: hand,
						angle: angle,
					};
					statements.push(statement);
				}
			}
			else if(className.indexOf("boolean-operation") >= 0){
			    var dom = this;
				validate = checkVariableDeclareAndField(this);
				if(validate){
					var statement = {
						type: "boolean-operation",
						content:dom
					};
					statements.push(statement);
				}
			}
			else if(className.indexOf("boolean-not") >= 0 ){
				var dom = this;
				validate = checkVariableDeclareAndField($(this).children()[0]);
				if(validate){
					var statement = {
						type: "boolean-not",
						content:dom
					};
					statements.push(statement);
				}
			}
			else if(className.indexOf("math") >= 0){
				var dom = this;
				validate = checkVariableDeclareAndField(this);
				if(validate){
					var statement = {
						type: "math",
						content:dom
					};
					statements.push(statement);
				}
			}
			else if (className.indexOf("open-if") >= 0){
				var dom = $(this).children()[0]; // sure to have element, no need error checking here
				validate = checkVariableDeclareAndField(dom);
				if(validate){
					var statement = {
				    	type:"open-if",
				    	content:dom
				    };
				    statements.push(statement);
				}
			}
			else if(className.indexOf("else") >= 0){
				statements.push({type:"else"});
			}
			else if(className.indexOf("close-if") >= 0){
				statements.push({type:"close-if"});
			}
			else if (className.indexOf('print-variable') >= 0) {
				statements.push({type:"printVariable", variableName: $(this).find('input').val()});
			}
			else if (className.indexOf("open-for") >= 0){
				var initial = $(this).children()[0];
				var loopCondition = $(this).children()[1];
				var increament = $(this).children()[2]; // for sure to have these 3 fileds in the div
				
				var className = $(initial).attr("class");
				if (className.indexOf("assign-variable") >= 0) {
					var dom = $(initial).children()[1];// the second child may be an complex expression
					var newVariable = $(initial).find(".variable").val().trim();
					var result = addNewVariable(newVariable, dom);
					if (result.valid) {
						initial = result.data;
					}
					validate = result.valid;
				} else if (className.indexOf("statementInput") >= 0) {
					validate = false;
				}

				className = $(increament).attr("class");
				if (className.indexOf("assign-variable") >= 0) {
					var dom = $(increament).children()[1];// the second child may be an complex expression
					var newVariable = $(increament).find(".variable").val().trim();
					var result = addNewVariable(newVariable, dom);
					if (result.valid) {
						increament = result.data;
					}
					validate = result.valid;
				} else if (className.indexOf("statementInput") >= 0) {
					validate = false;
				}

				if(validate && checkVariableDeclareAndField(loopCondition))
				{
					statements.push({
						type:"open-for",
						initial:initial,
						loopCondition:loopCondition,
						increament:increament
					});
				}
				else
					validate = false;
			} 
			else if(className.indexOf("close-for") >= 0){
				statements.push({type:"close-for"});
			}
			else if(className.indexOf("open-while") >= 0){
				if(checkVariableDeclareAndField($(this).children()[0])) {
					statements.push({type:"open-while", loopCondition:$(this).children()[0]});
				}
			}
			else if(className.indexOf("close-while") >= 0){
				statements.push({type:"close-while"});
			}
			else if (className.indexOf("wait") >= 0) {
				var time = $(this).children("input").val();
				if (!isNaN(parseInt(time))) {
					var statement = {type: "wait", time: time};
					statements.push(statement);
				} else {
					validate = false;
				}
			}
			else if (className.indexOf("canvasObj-position")>=0){
				//do nothing
			}
			else if(className.indexOf("mouse-position")>=0){
				//do nothing
			}
			else if (className.indexOf("play-music")>=0){
				console.log($(this).children()[0]);
				//console.log("the music I wanna play:", $($(this).children()[0]).val());
				statements.push({type:"play-music", target:$($(this).children()[0]).val()});//"Background Music" or "Clock tick"
			}
			else if(className.indexOf("stop-music")>=0){
				statements.push({type:"stop-music", target:$($(this).children()[0]).val()});
			}
			else if(className.indexOf("rotate-character")>=0){
				var dom = $(this).children()[1];// the second field is the degree
				validate = checkVariableDeclareAndField(dom);

				//TO DO: need to check the name field as well
				if(validate){
				statements.push({type:"rotate-character", name:$($(this).children()[0]).val(), degree:dom})
			    }
			}
			else {
				console.log("invalid statement");
			}
		});

		return {validate: validate, data: statements};
	}

	function checkExistingVariable(value){
		if(/^[a-zA-Z_0-9]*$/.test(value.trim()) == true && /^[0-9]*$/.test(value.trim()) == false) // must be a varible name then
		{
			if(value.trim() == "true" || value.trim() == "false")
				return true; // since these are boolean types
		    if(declaredVariables.indexOf(value.trim()) == -1)
		     	return false;
		}
		return true;
	}

	function checkVariableDeclareAndField(dom){
		// base case: the dom object is an input
		var tagName = $(dom).prop("tagName");

		if (tagName == "INPUT") {
			var value = $(dom).val();
			return checkExistingVariable(value);
		} else {
			var params = $(dom).children("div.expression");

			if (params.length == 0) { // this expression does not contain inner expressions
				var className = $(dom).attr("class");
				if (className.indexOf("assign-variable") >= 0) {
					var value = $(dom).children()[1];// the second child may be an complex expression
					var newVariable = $(dom).find(".variable").val().trim();
					var result = addNewVariable(newVariable, value);

					return result.valid;
				} else if (className.indexOf("canvasObj-position") >= 0) {
					var input = $(dom).children("input");
					var value = $(input[0]).val();
					
					return checkDuplicate(value);
				} else if(className.indexOf("mouse-position") >= 0) {
					return true;
				} else {
					var inputs = $(dom).children("input");
				
					if(inputs.length == 1) // for not
					{
						return checkExistingVariable($(inputs[0]).val());
					}
					else if(inputs.length == 2) // for the rest
					{
						var input1 = $(inputs[0]).val();
						var input2 = $(inputs[1]).val();
						return checkExistingVariable(input1) && checkExistingVariable(input2);
					}
					else
					{
						return false;// error has occured
					}
				}
			}
			else if (params.length == 1) { //inside is a not statement
				return checkVariableDeclareAndField(params[0]);
			} else {
				var checkResult1 = checkVariableDeclareAndField(params[0]);
				var checkResult2 = checkVariableDeclareAndField(params[1]);
				return checkResult1 && checkResult2;
			}	
		}	
	}

	function checkDuplicate (name) {
		for (var i = 0; i < chars.length; i++) {
			if(chars[i] == name) {
				return true;
			}
		};
		return false;
	}	

	function checkBrackets (statements) {
		var finalStaments = [];
		var stack = [];
		var validate = true;
		var i;

		for ( i = 0; i < statements.length; i++) {
			if (statements[i].type.indexOf("close") >= 0) {
				var temp = statements[i].type.split("-");
				var open = "open-" + temp[1];

				var temp = statements[i];
				var loop = [];
				while(stack.length > 0 && temp.type != open) {
					loop.unshift(temp); // move to front of loop array
					temp = stack.pop();
				}
				//mis-matched loop brackets
				if (stack.length == 0 && temp.type != open) {
					validate = false;
					break;
				} else {
					loop.unshift(temp); // move into front of loop array
					stack.push(loop); // push the combined result into the stack
				}
			} else {
				stack.push(statements[i]);
			}
		}

		for (i = 0; i< stack.length;i++){
			var type = stack[i].type;
			console.log("@@@@type remaining in the stack", stack[i]);
			if(type == "open-repeat" || type == "open-while" || type == "open-for" || type == "open-if" || type == "else") // there are more open tags than close tags
			{
				validate = false;
				break;
			}
			/*else if(stack[i] instanceof Array) // combined alr, check the inner staff
			{
				validate = checkLeftOpenBrackets(stack[i]);
			}*/
		}
		console.log("Check Bracket Results:", validate);
		return {validate: validate, data: stack};
	}

	 /*function checkLeftOpenBrackets(arr)
	 {
	 	var i;
	 	var type;
	 	for( i =0; i< arr.length; i++)
	 	{
			if(arr[i] instanceof Array) // combined alr, check the inner staff
			{
				return checkLeftOpenBrackets(arr[i]); // recursive call on itself
			}

	 	}

	 	// if comes out of this loop, means no array instance inside
	 	for(i =0; i< arr.length; i++)
	 	{
	 		type = arr[i].type;
	 		if(type == "open-repeat" || type == "open-while" || type == "open-for" || type == "open-if" || type == "else") // there are more open tags than close tags
			{
				return false;
			}
	 	}
	 	return true;
	 }*/

	function executeStatements(statements, index) 
	{
		var controller = window.COINCIDE.canvasController;
		if (index >= statements.length || stopAll) 
		{
			return;
		} 
			if (statements[index] instanceof Array) 
			{
				switch (statements[index][0].type) {
					case "open-if":
						var ifStatements = [];
						var elseStatements = [];
						var ifFLag = true;
						for (var i = 1; i < statements[index].length-1; i++) {
							if (statements[index][i].type == "else") {
								ifFLag = false;
								continue;
							}
							if (ifFLag) {
								ifStatements.push(statements[index][i]);	
							} else {
								elseStatements.push(statements[index][i]);
							}
						};
						
						var condition = evaluateExpression(statements[index][0].content);
						statements = statements.slice(index+1);// get the array of statements after this loop statements
						if (condition.valid && condition.data) {
							statements = ifStatements.concat(statements);
						} else if (elseStatements.length > 0) {
							statements = elseStatements.concat(statements);
						}
					break;

					case "open-repeat":
						var loop = statements[index].slice(1, statements[index].length-1);// get rid of the front and end one
						var repeatLength = statements[index][0].time;
						statements = statements.slice(index+1);// get the array of statements after this loop statements

						//repeat the contents in the loop and add to the statements array
						for(var i=0;i<repeatLength;i++)
						{
							statements = loop.concat(statements);
						}
					break;

					case "open-while":
						var conditionDOM = statements[index][0].loopCondition;
						var condition = evaluateExpression(conditionDOM);
						console.log("conditinp in side open while", condition);
						var whileStatements = statements[index].slice(1, statements[index].length-1);
						statements = statements.slice(index);
						
						if (condition.valid && condition.data) {
							statements = whileStatements.concat(statements);
						} else {
							statements = statements.slice(1);
							if (statements.length == 0) return;
						}
					break;

					case "open-for":
						var initialStatement = statements[index][0].initial;
						var incrementStatement = statements[index][0].increament;

						var conditionDOM = statements[index][0].loopCondition;
						var condition = evaluateExpression(conditionDOM);

						var loop = statements[index].slice(1, statements[index].length-1);
						statements = statements.slice(index+1);
						
						var statement = {
							type: "open-while",
							loopCondition: conditionDOM
						}

						var temp = [initialStatement];
						loop.unshift(statement);
						loop.push(incrementStatement);
						loop.push({type: "close-while"});
						temp.push(loop);
						statements = temp.concat(statements);
						/*
						else {
							statements = statements.slice(1);
							if (statements.length == 0) return;
						}
						*/
					break;
				}
 
				console.log("after concat the statements:", statements);
				executeStatements(statements, 0);
			} 
			else 
			{
				executeStatement(statements, index, function(statements, index){
					executeStatements(statements, index);
				});
			}
	}

	function executeStatement(statements, index, callback) {
		var statement = statements[index];
		console.log("The object to process this time:", statement);
		var canvasControl = window.COINCIDE.canvasController;
		var needSlowDown = false;

		switch (statement.type) {
			case "create-object":
				var object = statement.object;
				var name = statement.name;
				var x = evaluateExpression(statement.x).data;
				var y = evaluateExpression(statement.y).data;

				if (object == "Character") {
					canvasControl.createCharacter(name, {x_pos:parseFloat(x), y_pos:parseFloat(y), angle: 0, profile_pic_url:"https://graph.facebook.com/bimlesh.wadhwa/picture"});
				} else if (object == "Clock") {
					canvasControl.createClockFace(name, {x_pos:parseFloat(x), y_pos:parseFloat(y)});
				}
			break;

			case "set":
				var name = statement.name;
				var axis = statement.axis;
				var value = evaluateExpression(statement.value).data;

				if (axis == "x") {
					canvasControl.setCharacterPosition_X(name, {x_pos: parseFloat(value)});// must do the parse
				} else {
					canvasControl.setCharacterPosition_Y(name, {y_pos: parseFloat(value)});
				}
			break;
			case 'printVariable':
				
				var i = 0;
				for (; i < variableMap.length; i++) {
					if (variableMap[i].key == statement.variableName) {
						canvasControl.printVariable(variableMap[i].key, variableMap[i].value);
						break;
					}
				}

			case "show":
				canvasControl.showCharacter(statement.name);
			break;
			
			case "hide":
				canvasControl.hideCharacter(statement.name);
			break;
			
			case "changeCostume":
				canvasControl.changeCharacter(statement.name);
			break;

			case "set-variable":
				var value = evaluateExpression(statement.value);
				if (value.valid) {
					var i = 0;
					for (; i < variableMap.length; i++) {
						if (variableMap[i].key == statement.variable) {
							variableMap[i].value = value.data;
							break;
						}
					}
					if (i == variableMap.length) {
						variableMap.push({key: statement.variable, value: value.data});
					}
				}
				console.log(variableMap, "set variable");
			break;
			
			case "changeBackground":
				canvasControl.changeBackGround();
			break;
			
			case "move":
				var name = statement.name;
				var direction = statement.direction;
				needSlowDown = canvasControl.moveCharacter(name, {direction: direction, distance: 100});
			break;

			case "createClockHands":
				var name = statement.name;
				var hand = statement.hand;
				var angle = statement.angle;
				canvasControl.createClockHands(name, {hand: hand, angle: parseFloat(angle)});
			break;

			case "rotateClockHands":
				var name = statement.name;
				var hand = statement.hand;
				var angle = statement.angle;
				canvasControl.rotateClockHands(name, {hand: hand, angle: parseFloat(angle)});
			break;
			case "play-music":
				var target = statement.target;
				var a;
				if(target == "Background Music")
				{
					a = document.getElementById("bgSound");
					if (a.paused) {
			            a.play();
			        }
				}
				else
				{
					a = document.getElementById("clockSound")
					if(a.paused){
						a.load();
						a.play();
					}
				}
			break;
			case "stop-music":
				var target = statement.target;
				var a;
				if(target == "Background Music")
				{
					a = document.getElementById("bgSound");
					if (!a.paused) {
			            a.pause();
			        }
				}
				else
				{
					a = document.getElementById("clockSound")
					if(!a.paused){
						a.pause();
					}
				}
			break;
			case "rotate-character":
				var degree = evaluateExpression(statement.degree); // pass in a dom, get a value
				console.log("degree is", degree.data);
				window.COINCIDE.canvasController.rotateCharacter(statement.name, {angle:degree.data, direction:"clockwise"});
			break;
		}

		var type = statement.type;
		if(type == "create-object" || type == "move" || type == "rotate-character" || type == "wait" || type == "createClockHands") {
			var waitAmout = needSlowDown ? 2000:1000;
			if (type == "wait") {
				waitAmout = statement.time
			}
			setTimeout(function(){
				console.log("finish of current statement");
				callback(statements, index+1)
			}, waitAmout);
		}
		else {
			setTimeout(function(){
				callback(statements, index+1)
			}, 1);
		}
	}

	function evaluateExpression(node) {
		// base case: the dom object is already an input, not an expression
		var tagName = $(node).prop("tagName");
		if (tagName == "INPUT") {
			var value = $(node).val();
			
			if (isBoolean(value)) {
				var result = value == "true";
				return {valid: true, data: result};
			} 
			else if (!isNaN(parseInt(value))) {
				return {valid: true, data: parseInt(value)};
			}
			else {
				var data = getExistingVariable(value);
				return {valid: true, data: data};
			}
			
			return {valid: false};
		} 
		// recursive case: the dom object is an expression
		else {
			var expressions = $(node).children("div.expression");
			var operator = $(node).children("select").children("option:selected").text();
			console.log(operator, "operator");
			console.log("number of children", expressions.length);
			// this expression doesn't contain other expressions
			if (expressions.length == 0) {
				var className = $(node).attr("class");
				if (className.indexOf("canvasObj-position") >= 0) {
					var input = $(node).children("input");
					var coordinate = $(node).children("select").children("option:selected").text();
					var name = $(input[0]).val();

					if (coordinate == "x") {
						var x = window.COINCIDE.canvasController.getCharacterX(name);
						return {valid: true, data: x};
					}
					else {
						var y = window.COINCIDE.canvasController.getCharacterY(name);
						return {valid: true, data: y};
					}
				} else if (className.indexOf("mouse-position") >= 0) {
					var direction = $(node).children("select").children("option:selected").text();
					if (direction == "x") {
						var x = window.COINCIDE.canvasController.getMousePosition().X;
						return {valid: true, data: x};
					} else {
						var y = window.COINCIDE.canvasController.getMousePosition().Y;
						return {valid: true, data: y};
					}
				} else {
					// check the inputs of this expression
					var inputs = $(node).children("input");
					
					if (inputs.length == 1) {
						var value = $(inputs[0]).val();
						// for not operation
						if (isBoolean(value)) {
							var result = !(value == "true" || value == true);
							return {valid: true, data: result};
						}
						
						return {valid: false};
					} 
					else {
						var input1 = $(inputs[0]).val();
						var input2 = $(inputs[1]).val();

						var result = evaluate(operator, input1, input2); 
						return result;
					}
				}
			} 
			// one input with one expression
			else if (expressions.length == 1) {
				var input = $(node).children("input").val();
				var evaluatedResult = evaluateExpression(expressions[0]);
				if (!evaluatedResult.valid) {
					return {valid: false};
				}

				var result = evaluate(operator, input, evaluatedResult.data);
				return result;
			}
			// two expressions inside 
			else {
				var evaluatedResult1 = evaluateExpression(expressions[0]);
				var evaluatedResult2 = evaluateExpression(expressions[1]);

				if (!evaluatedResult1.valid || !evaluatedResult2.valid) {
					return {valid: false};
				}

				var result = evaluate(operator, evaluatedResult1.data, evaluatedResult2.data);
				return result;
			}
		}
	}

	function evaluate(op, param1, param2) {
		param1 = getInputValue(param1);
		param2 = getInputValue(param2);
		console.log(op, param1, param2, "calculate");
		switch(op) {
			// math operation
			case "+": 
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					var result = {valid: true, data: (parseInt(param1) + parseInt(param2))};
					return result;
				}
				return {valid: false};
			break;

			case "-":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					var result = {valid: true, data: (parseInt(param1) - parseInt(param2))};
					return result;
				}
				return {valid: false};
			break;

			case "*":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					var result = {valid: true, data: (parseInt(param1) * parseInt(param2))};
					return result;
				}
				return {valid: false};
			break;

			case "/":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN && parseInt(param2) != 0) {
					var result = {valid: true, data: (parseInt(param1) / parseInt(param2))};
					return result;
				}
				return {valid: false};
			break;

			case "%":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN && parseInt(param2) != 0) {
					var result = {valid: true, data: (parseInt(param1) - (parseInt(param1) / parseInt(param2)) * parseInt(param2))};
					return result;
				}
				return {valid: false};
			break;

			// comparison
			case "=":
				if (parseInt(param1) == parseInt(param2)) {
					return {valid: true, data: true};
				}
				return {valid: false};
			break;

			case "<":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					if (parseInt(param1) < parseInt(param2)) {
						return {valid: true, data: true};
					} else {
						return {valid: true, data: false};
					}
				}
				return {valid: false};
			break;

			case "≤":

				console.log("!!!!!!!!!!!!",op, param1, param2, "evaluate <=");
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					if (parseInt(param1) <= parseInt(param2)) {
						console.log("param1 is smaller than param2:", parseInt(param1), "<=", parseInt(param2));
						return {valid: true, data: true};
					} else {
						console.log("param2 is smaller than param1:", parseInt(param1), ">=", parseInt(param2));
						return {valid: true, data: false};
					}
				}
				return {valid: false};
			break;

			case ">":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					if (parseInt(param1) > parseInt(param2)) {
						return {valid: true, data: true};
					} else {
						return {valid: true, data: false};
					}
				}
				return {valid: false};
			break;

			case "≥":
				if (parseInt(param1) != NaN && parseInt(param2) != NaN) {
					if (parseInt(param1) >= parseInt(param2)) {
						return {valid: true, data: true};
					} else {
						return {valid: true, data: false};
					}
				}
				return {valid: false};
			break;

			// boolean operation
			case "And":
				if (isBoolean(param1) && isBoolean(param2)) {
					var bool1 = (param1 == "true" || param1 == true);
					var bool2 = (param2 == "true" || param2 == true);
					return {valid: true, data: (bool1 && bool2)};
				}
				return {valid: false};
			break;

			case "Or":
				if (isBoolean(param1) && isBoolean(param2)) {
					var bool1 = (param1 == "true" || param1 == true);
					var bool2 = (param2 == "true" || param2 == true);
					return {valid: true, data: (bool1 || bool2)};
				}
				return {valid: false};
			break;

			case "Not":
				if (isBoolean(param1)) {
					var bool = !(param1 == "true" || param1 == true);
					return {valid: true, data: bool};
				}
				return {valid: false};
			break;
		}
	}

	function isBoolean(s) {
		var val = (s === "true" || s === "false" || s === true || s === false);
		return val;
	}	

	function addNewVariable(newVariable, dom) {
		if(declaredVariables.indexOf(newVariable) != -1) // if already exist then, update
		{
			if(checkVariableDeclareAndField(dom))
			{
				var statement = {
					type:"set-variable",
					variable: newVariable,
					value: dom
				};
				return {valid:true, data:statement};
			}
			else
				return {valid: false};
		}
		else // create such variable
		{			
			if(/^[a-zA-Z0-9_]*$/.test(newVariable) == false ||/^[0-9]*$/.test(newVariable.substring(0,1)) == true) //invalid expression for varible name
			{
				return {valid: false};
			}
			else
			{
				if(checkVariableDeclareAndField(dom))
				{
					var statement = {
						type:"set-variable",
						variable: newVariable,
						value: dom
					}
					declaredVariables.push(newVariable);
					return {valid: true, data: statement};
				}
				else
					return {valid: false};
			}
		}
	}

	// convert input string value to integer or boolean or get value from existing variable
	function getInputValue(s) {
		if (isBoolean(s)) {
			return (s == "true" || s == true);
		} else if (!isNaN(parseInt(s))) {
			return parseInt(s);
		} else {
			return getExistingVariable(s);
		}
	}

	function getExistingVariable(key) {
		for (var i = 0; i < variableMap.length; i++) {
			if (variableMap[i].key == key) {
				return variableMap[i].value;
				break;
			}
		}
	}

	// TESTING EVALUATION
	function testEvaluation() {
		var temp = document.createElement("div");
		var string = 
			"<input class='math-input integer-input form-control statementInput' type='text' size='1' value='5' placeholder='value'>"
		+	"<select class='math-operator form control statementSelect'>"
		+		"<option selected='selected'>+</option>"
		+	"</select>"
		+	"<div class='math statement-div form-inline integer-expr expression ui-draggable ui-draggable-handle' style='display: block;'>"
		+		"<input class='math-input integer-input form-control statementInput' value='3' type='text' size='1' placeholder='value'>"
		+		"<select class='math-operator form control statementSelect'>"
		+			"<option>+</option>"
		+			"<option selected='selected'>-</option>"
		+			"<option>*</option>"
		+			"<option>/</option>"
		+			"<option>%</option>"
		+		"</select>"
		+		"<input class='math-input form-control integer-input statementInput' value='10' type='text' size='1' placeholder='value'>"
		+	"</div>";
		temp.innerHTML = string;

		//console.log($(temp).children("input").val());
		console.log(evaluateExpression(temp), "evaluate");
	}
});








