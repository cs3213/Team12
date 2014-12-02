define(["App", "jquery"], function(app, $){
		//console.log("!!!",app);
		//alert("!!!!!!Ready inside SaveLoad.js");
		function SaveLoadController (curId) {
		    this.curProgramId = curId;
		}
		SaveLoadController.prototype.setCurProgramId= function(id){
			this.curProgramId = id;
		}
		SaveLoadController.prototype.getCurProgramId= function(){
			return this.curProgramId;
		}
		SaveLoadController.prototype.deleteProgram= function(id, thisElement){
			alert("in delete program:"+ id);
			var self = this;
			$.post("/delete/", {"id":id}, function(response){
				console.log("Echo:",response);
				console.log("Front end delte:", thisElement);
				thisElement.remove();
				if($("#lastmodifiedId").attr("value") == id) // if current canvas is the one we want to delete
				{
					var statementContainer = document.getElementsByClassName("program")[0];
					statementContainer.innerHTML = "";//clear whatever it is on the current program segement
					window.COINCIDE.canvasController.clearCanvas();//clear the content in the canvas	
					$("#lastmodifiedId").attr("value", -1);
					$("#lastmodifiedId").html("Current Program: ");
				}
				if(document.getElementById("myProgramList").getElementsByTagName("li").length == 0) // no more programs
				{
					self.setCurProgramId(-1); // indicate that currently no more programs
				}
			});
		}
		SaveLoadController.prototype.saveProgram = function(){
			//alert($("#userEmail").text());
			var programDivContent = document.getElementsByClassName("ember-view program ui-droppable ui-sortable")[0].innerHTML;
			console.log("The div content to save:", programDivContent);
			var canvasContent = (window.COINCIDE.canvasController.saveToJSON());
			var content = {"programDivContent": programDivContent, "canvasContent":canvasContent};
		    var data;
		    var self = this;
		    //alert("curProgramID" + this.getCurProgramId())

		    /**
		    create
		    */
			if(this.getCurProgramId() == -1)
			{

				//alert("in create");
			    data= {"content":JSON.stringify(content), "owner":$("#userEmail").text()};
				$.post("/create/", data, function(response){
					//alert("create success");
					//console.log("Echo content:", JSON.parse(response.data.content));
					var newProgramId = response.data.id;
					$("#lastmodifiedId").attr("value", newProgramId); //update the current id shown
					$("#lastmodifiedId").text("Current Program: "+newProgramId);
					self.setCurProgramId(newProgramId); // update the current program 
					console.log("the id of the objectnow:", self.getCurProgramId());
					console.log(response);
					var newProgramString = '<li><a style="display: inline-block" class="loadProgram" href="#" value="'+newProgramId+'">'+newProgramId+'</a><a class="program-delete-link" href="#" style="padding-left: 0; padding-right: 30px;"><img src="static/img/icon_delete.png" alt=""></a></li>';
					var temp = document.createElement("div");
					temp.innerHTML = newProgramString;
					var nodeToAdd = temp.firstChild;
					var firstNode = document.getElementById("myProgramList").firstChild;
					document.getElementById("myProgramList").insertBefore(nodeToAdd, firstNode);
					$(".loadProgram").unbind("click").click(function(){
						self.loadProgram($(this).attr("value"));
					});
					$(".program-delete-link").unbind("click").click(function(){
						self.deleteProgram($(this).prev().attr("value"), $(this).parent());
					});

				});
		    }
		    /**
		    Update
		    */
		    else
		    {
		    	//alert("In update" + this.getCurProgramId());
				data= {"content":JSON.stringify(content), "id":this.curProgramId};
				$.post( "/update/", data, function( response ) {
					//alert("update success");
					console.log("echo: ", response);
					$("#lastmodifiedId").attr("value", response.data.updatedId);
					$("#lastmodifiedId").text("Current Program: "+response.data.updatedId);
				});
		    }
		}

		SaveLoadController.prototype.loadProgram = function(id){
			//need to ask the user whether he wants to save the current program first
			//alert("in load program, No:"+id);

			this.curProgramId = id; //update current program Id
			$.post("/read_program/", {"id": id}, function(response){
				//alert("read sucess!!!");
				//console.log("Response from load:", response);
				$("#lastmodifiedId").attr("value", response.data.id);
				$("#lastmodifiedId").text("Current Program: "+response.data.id);
				var dataJSON = JSON.parse(response.data.content);
				//console.log(dataJSON);
				var statementContainer = document.getElementsByClassName("program")[0];
				statementContainer.innerHTML = "";//clear whatever it is on the current program segement
				window.COINCIDE.canvasController.clearCanvas();//clear the content in the canvas

				var programDivContent = dataJSON.programDivContent;
				//console.log("Content String: ", programDivContent);
				//var tmpNode = document.createElement("div");
			    //tmpNode.innerHTML = programDivContent;
			    //console.log("THe contents to be added:", tmpNode);// the divs of the statements
			    /*
			    if(tmpNode.firstChild != null)
			    {
			    statementContainer.appendChild(tmpNode.firstChild);// append to the program segment
			    }// only if not null then I need to append*/
			    statementContainer.innerHTML = programDivContent;// load the commands

			    window.COINCIDE.canvasController.loadFromJSON(dataJSON.canvasContent); // load the canvas 
			    //console.log('Select the statemnet Inputs:', $(statementContainer).find(".statementInput"));
		             $(statementContainer).find(".statementInput").each(function( index ) {
		                //console.log( index , ": " , $( this )[0] );
		                $( this ).unbind("keyup").keyup(function() {
		                  $(this).attr("value", $(this).val());
		                });
		              });
		              //console.log('in insert with View and Element, Selects:', this.$(".statementSelect"));
		              $(statementContainer).find(".statementSelect").each(function( index ) {
		                //console.log( index , ": " , $( this )[0] );
		                $( this ).on('change', function() {
		                  //alert($(this).val());
		                  var selectedVal = $(this).val();                 
		                  //console.log($(this).find("option"));
		                  $(this).find('option').each(function(){
		                    //console.log($(this).val());
		                    if($(this).val() == selectedVal)
		                    $(this).attr("selected", true);
		                    else
		                    $(this).attr("selected", false);
		                  })
		                });
		              });

			});

		}

		$(document).ready(function(){
			var mySavaLoadController = new SaveLoadController($("#lastmodifiedId").attr("value"));
			if($("#lastmodifiedId").attr("value") != -1 && $("#lastmodifiedId").attr("value") != "")
			{
					mySavaLoadController.loadProgram($("#lastmodifiedId").attr("value"));
			}
			$("#saveProgram").unbind("click").click (function(){
				//alert("in save program");
				mySavaLoadController.saveProgram();
			});

			$(".loadProgram").unbind("click").click(function(){
				//alert("in load program");
				//console.log("load program No:",$(this).attr("value"));

				mySavaLoadController.loadProgram($(this).attr("value"));
			});
			$(".program-delete-link").unbind("click").click(function(){
				//alert("in load program");
				//console.log("load program No:",$(this).attr("value"));

				mySavaLoadController.deleteProgram($(this).prev().attr("value"), $(this).parent());
			});

			$("#newProgram").unbind("click").click (function(){
				alert("Create new program and Save the Current program");
				if(mySavaLoadController.getCurProgramId()!=-1)
				{
				mySavaLoadController.saveProgram();//TO DO: to ask user whether wish to save current program
				mySavaLoadController.setCurProgramId(-1);// a new program with inital id of -1
			    }
				//console.log(mySavaLoadController.getCurProgramId);
				var statementContainer = document.getElementsByClassName("ember-view program ui-droppable ui-sortable")[0];
				statementContainer.innerHTML = "";//clear whatever it is on the current program segement
				window.COINCIDE.canvasController.clearCanvas();//clear the content in the canvas		
			});
		});
	return {"Saveload":"success"}// return a dummy object
});
