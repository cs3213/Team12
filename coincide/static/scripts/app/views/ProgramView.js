define([
  "ember",
  "controllers/programController",
  "text!templates/programTemplate.html",
  "views/statementRecycleView"
  ], function(Em, programController, programTemplate, recycle){  
    var programView = Em.ContainerView.extend({
      tagName: 'div',
      classNames: ['program'],
      defaultTemplate: Ember.Handlebars.compile(programTemplate),
      controller: programController,
      inputClasses: '.integer-input, .boolean-input, .compositeControl',
      findXYForDom: function(element) {
          var left = 0;
          var top = 0;
          var lastElement = element;
          if (element.offsetParent) {
            left += element.offsetLeft;
            top += element.offsetTop;
            element = element.offsetParent;
            while (element) {
              left += element.offsetLeft;
              top += element.offsetTop;
              left -= element.scrollLeft;
              top -= element.scrollTop;
              lastElement = element;
              element = element.offsetParent;
            }
          }
          // Adjust for document scroll position
          var agent = navigator.userAgent.toLowerCase();
          if (agent.indexOf('firefox') == -1) {
            var leftAdjust = document.body.scrollLeft || document.documentElement.scrollLeft;
            var topAdjust = document.body.scrollTop || document.documentElement.scrollTop;
            left += leftAdjust;
            top += topAdjust;
          }
          return {
            x: left,
            y: top
          };
      },
      pnpoly: function(nvert, vertx, verty, testx, testy) {
        var i, j, c = false;

        // Actual calculation
        for (i = 0, j = nvert-1; i < nvert; j = i++) {
          if ( ((verty[i]>testy) != (verty[j]>testy)) &&
            (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
            c = !c;
        }
        return c;
      },
      elementFromPoint: function(x, y, elems) {
        var self = this;
        var hoverElem = null;
        // console.log('in element from point', x, y, elems);
        elems.each(function(idx, elem) {
          var domY = $(elem).offset().top;
          var domX = $(elem).offset().left;
          // console.log('coordinates', domY, domX);

          if (self.pnpoly(4, [domX, domX+$(elem).innerWidth(), domX, domX+$(elem).innerWidth()], [domY, domY, domY+$(elem).innerHeight(), domY+$(elem).innerHeight()], x, y)) { // point is in rectangle
            // console.log('hoverring elem', $(elem));
            hoverElem = $(elem);
            return false;
          }
        });
        return hoverElem;
      },
      insertWithViewAndElement: function(newView, elem) {
              var self = this;
              this.pushObject(newView);
              newView.set('element', elem);
              //console.log(elem);
              //console.log('in insert with View and Element, Inputs:', self.$(".statementInput"));
              self.$(".statementInput").each(function( index ) {
                // console.log( index , ": " , $( this )[0] );
                $( this ).unbind("keyup").keyup(function() {
                  $(this).attr("value", $(this).val());
                });
              });
              //// console.log('in insert with View and Element, Selects:', this.$(".statementSelect"));
              self.$(".statementSelect").each(function( index ) {
                //// console.log( index , ": " , $( this )[0] );
                $( this ).on('change', function() {
                  //alert($(this).val());
                  var selectedVal = $(this).val();                 
                  //// console.log($(this).find("option"));
                  $(this).find('option').each(function(){
                    //// console.log($(this).val());
                    if($(this).val() == selectedVal)
                    $(this).attr("selected", true);
                    else
                    $(this).attr("selected", false);
                  })
                });
              });
              // this.rerender();
              // newView.rerender();
      },
      mouseEnter: function(e) {
        // // console.log('mouse enter', e.target);
      },
      removeDraggable : function(self){
        self.$().find("div.statement-div div.statement-div").each(function(idx, ele){
            console.log(ele);
            console.log("div inside div draggable status:", $(ele).data('ui-draggable'));
            //$(ele).draggable("destroy");
        });
      },
      putBackMissingInputs : function(JParent,JPrev,widthToDeduct){ // input is a dom warpped in Jquery object
        var self = this;
        var mathInputStr = '<input class="math-input form-control integer-input statementInput" type="text" size="1" placeholder="value">';
        var booleanExpStr = '<input class="booleanExp-input integer-input form-control statementInput" type="text" size="1" placeholder="value">';
        var booleanOpStr = '<input class="booleanOp-inputs form-control statementInput boolean-input" type="text" size="4" placeholder="boolean">';
        var booleanNotStr = '<input class="booleanNot-cmp  form-control statementInput boolean-input" type="text" size="4" placeholder="boolean">';

        var forIninitialStr = '<input class="for-init form-control statementInput compositeControl" type="text" size="3" placeholder="initial">';
        var forConditionStr = '<input class="for-condition form-control statementInput compositeControl" type="text" size="6" placeholder="condition">';
        var forIncrementStr = '<input class="for-increment form-control statementInput compositeControl" type="text" size="6" placeholder="increment">';

        var whileStr ='<input class="while-condition form-control statementInput compositeControl" type="text" size="4" placeholder="boolean">';
        var ifStr = '<input class="openIf-condition form-control statementInput compositeControl" type="text" size="4" placeholder="boolean">';
        var assignstr = '<input class="value form-control statementInput compositeControl" type="text" size="1" placeholder="value">';

        var htmlString = null;
        if(JParent.hasClass("math"))
        {
          htmlString = mathInputStr;
        }
        else if(JParent.hasClass("boolean-exp"))
        {
          htmlString = booleanExpStr;
        }
        else if(JParent.hasClass("boolean-operation"))
        {
          htmlString = booleanOpStr;
        }
        else if(JParent.hasClass("boolean-not"))
        {
          htmlString = booleanNotStr;
        }
        else if(JParent.hasClass("open-for")&&JPrev.length == 0) // no prev element
        {
          htmlString = forIninitialStr;
        }
        else if(JParent.hasClass("open-for")&& JPrev.length > 0 &&JPrev.hasClass("for-init")) // prev element is for init
        {
          htmlString = forConditionStr;
        }
        else if(JParent.hasClass("open-for")&& JPrev.length > 0 &&JPrev.hasClass("for-condition")) // prev element is for condition
        {
          htmlString = forIncrementStr;
        }
        else if(JParent.hasClass("open-while"))
        {
          htmlString = whileStr;
        }
        else if(JParent.hasClass("open-if"))
        {
          htmlString = ifStr;
        }
        else if(JParent.hasClass("assign-variable"))
        {
          htmlString = assignstr;
        }
        else
        {
          alert("some error has happened, dragged in not implememtable combination, Please check your inputs");
          htmlString = "<input placeholder = 'ERROR'>";
        }

        if(JPrev.length == 0) // the first input should be add back, then add the first child to the div parent
        {
          if(JParent.hasClass("open-for"))
            JParent.children().first().before(htmlString);
          else if(JParent.hasClass("open-while")||JParent.hasClass("boolean-not"))
            JParent.append(htmlString); // put as the last element
          else if(JParent.hasClass('open-if') )
          {
            var lastTextDom = JParent.get()[0].lastChild;
            var domTemp = document.createElement("div");
            domTemp.innerHTML = htmlString;
            var domToInsert = domTemp.firstChild;
            JParent.get()[0].insertBefore(domToInsert, lastTextDom); // emulated insert after
          } 
          else
            JParent.prepend(htmlString);
        }
        else
        {
          console.log("JPrev:", JPrev);
          if(JParent.hasClass("assign-variable"))
            JParent.append(htmlString);
          else
          JPrev.after(htmlString);
        }

       
        var parent = JParent;
        
        while (parent.parent().attr("class").indexOf("statement-div") >= 0) {
          parent = parent.parent();
        }
        console.log("Most outer parent:", parent);
        console.log("the width to set:", width);
        var width = parent.width()  - widthToDeduct + 30; // 20 is assumed to be the width of the input element
        JParent.css("width", "auto"); // let the current parent become flexible
        if(JParent != parent) // if indeed there are outer parents
        {
          console.log("There is indeed one more outer parent");
          parent.width(width);
        }
        else if(JParent == parent && width > 333) //width is greater than the programlist div width, can not just adjust to auto
        {
          console.log("Need to adjust the width after set as auto");
          parent.width(width);
        }
        
        //let the new inputs have the key up listerner
        self.$(".statementInput").each(function( index ) {
            // console.log( index , ": " , $( this )[0] );
            $( this ).unbind("keyup").keyup(function() {
           $(this).attr("value", $(this).val());
          });
        });


      },

      droppableInit: function(self) {
        self.$().droppable({
          scope: 'program',
          activeClass: 'highlight',
          hoverClass: 'darken',
          toleranceType: 'fit',
          drop: function(e, ui) {
            //sweetAlert("dropped!", 'success');
            
            var type = ui.helper.parent().attr('data-statement-type');
            var statementDict;
            if(type == "create" || type == "setxy"||type == "move" ||type == "showChar" || type == "hideChar"||type == "changeCostume" ||type == "changeBackground" || type == "createClockHands"||type == "rotateClockHands" || type == "rotateCharacter" ||type == "wait" ||type == "playMusic" ||type =="stopMusic")
               statementDict = window.COINCIDE.StatementsPanel_1_View.statementDict;
            else if(type == "assignVariable" || type == "math" || type == "booleanExp" ||type == "booleanOp" || type == "booleanNot" ||type == "canvasObjPosition" ||type == "mousePosition" || type == 'printVariable')
                statementDict = window.COINCIDE.StatementsPanel_2_View.statementDict;
            else
                statementDict = window.COINCIDE.StatementsPanel_3_View.statementDict;

              //console.log("nima type", type);
            var newViewClass = statementDict[type].child;

            if (!newViewClass) return;

            var newView = newViewClass.create();

            self.insertWithViewAndElement.call(self, newView, ui.helper);
            self.sortableInit(self);
          }
        });
      },
      sortableInit: function(self) {
        // console.log('init sortable: ', self);

        self.$().sortable({
          containment: ".statement-panel-program-div",
          // axis: 'y',
          dropOnEmpty: false,
          connectWith: '.recycle',
          placeholder: "ui-state-highlight",
          // appendTo: ".statement-panel-program-div",
          cursor: "pointer", 
          delay: 100,
          distance: 5,
          revert: 100,
          // cursorAt: { top: '56%', left: '56%' }, // percentage not supported
          scroll: true,
          // helper: "clone",
          zIndex: 100,
          forcePlaceholderSize: true,
          cancel: 'input, select',
          deactivate: function( event, ui ) {
            //console.log("$$$sorting complete for the sortable", ui.draggable);
            //self.removeDraggable(self);
          },
          out:function (event, ui){
            console.log("%%% object dragged out of the connect list"); //this is not logged
          },

          start: function(event, ui) {
            //console.log("Program sortable dragging started", event, ui);
            //console.log($(ui.item[0]).width());
            //console.log("$$$at start:", ui.sender);
            if($(ui.item[0]).width() > 301) // the width of the dust bin, corresponding to 95% of col-md-6
              $(ui.item[0]).addClass(" fixWidth"); // make it smaller
            if($(ui.item[0]).hasClass("lineBylineOnProgramList"))
              $(ui.item[0]).removeClass("lineBylineOnProgramList");
            console.log("parent is",$(ui.item[0]).parent());
            if( $(ui.item[0]).parent().hasClass("program") == false)
            {
              console.log("need to add back input field");
              console.log($(ui.item[0]).prev().length);
              self.putBackMissingInputs($(ui.item[0]).parent(),$(ui.item[0]).prev(), $(ui.item[0]).width());
            }
          },
          beforeStop: function(event, ui) {
            //console.log("Program sortable dragging beforestop", event, ui);
            self.$().find(self.inputClasses).removeClass('cc-highlighted');
            var desiredHoverInput = self.checkDesiredHoverInput(event, ui);
            if (desiredHoverInput) {
              
              // if the ui.item has the class of fixed width, get rid of it here immediately
             //console.log("!!!! ui item [0] at before stop:", $(ui.item[0]).data('ui-draggable') == null);
              //$(ui.item[0]).draggable({ disabled: true });
              if($(ui.item[0]).hasClass("fixWidth")){
              $(ui.item[0]).removeClass(" fixWidth");
              }
              var parent = desiredHoverInput.parent();
              while ($(parent).parent().attr("class").indexOf("statement-div") >= 0) {
                parent = $(parent).parent();
              }
              //console.log("Desired input is ", desiredHoverInput, " width: ", desiredHoverInput.css('width'));
              console.log("Parent to display:", parent, parent.width());

              console.log("I wish to make this length to parent", parent.width()+$(ui.item[0]).width() -30);
              var width = parent.width() + $(ui.item[0]).width() - 30; // 20 is the assumed to be the width of the input element
              desiredHoverInput.replaceWith($(ui.item[0]));
              parent.width(width);
            }
          },
          stop: function(event, ui) {
            //console.log("!!!! ui item [0] at stopped:", $(ui.item[0]).data('ui-draggable') == null);
            //console.log("Program sortable dragging stopped", event, ui);
            if($(ui.item[0]).hasClass("fixWidth")){
              console.log("HAS FIXWIDTH");
              $(ui.item[0]).removeClass(" fixWidth");
            }
            //console.log("Test Whether the element has gone into the input", $(ui.item[0]).parent());
            if($(ui.item[0]).parent().hasClass("program")){ // this is the top items on the program list, should be displayed as line by line
              $(ui.item[0]).addClass("lineBylineOnProgramList");
            }
          },
          sort: function(event, ui) {
            // console.log('dragging...');
            self.updateHighlightStatus(event, ui);
          },
      });
      },
      click: function(e) {
        if ($(e.target).hasClass('statement-div')) {
          // console.log('your click coordinates', e.pageX, e.pageY);
          // console.log('div dom coordinates', $(e.target).offset().left, $(e.target).offset().top);
             // console.log('div dom coordinates bot right', $(e.target).offset().left+$(e.target).innerWidth(), $(e.target).offset().top+$(e.target).innerHeight());
        }
      },
      checkDesiredHoverInput: function(event, ui) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        // var elementMouseIsOver = document.elementFromPoint(mouseX, mouseY);
        var othersInputs = this.$().find(this.inputClasses).filter(function(idx, elem) {
          //console.log("all inputs in the program view:",elem);
          if ($.inArray(ui.item[0], $(elem).parents()) != -1) { // if my own input, discard
            return false;
          }
          else { // if some other inputs in the program view, potentially to be my hovered ones, proceed to check X,Y position
            return true;
          }
        });
        // var inputMouseIsOver = $(elementMouseIsOver).filter(this.inputClasses);
         //console.log('othersInputs', othersInputs);
        var hoverInput = this.elementFromPoint(mouseX, mouseY, othersInputs);
        //console.log("hoveredInput is null??:", hoverInput);
        var desiredHoverInput = null;
        if (hoverInput) {
          desiredHoverInput = this.isTypeMatch($(ui.item[0]), hoverInput) ? hoverInput : null;
        }
        return desiredHoverInput;
      },
      updateHighlightStatus: function(event, ui) {
        var self = this;
        // console.log('in updateHighlight status');
        
        this.$().find(this.inputClasses).removeClass('cc-highlighted');
        
        var desiredHoverInput = this.checkDesiredHoverInput(event, ui);
        if(desiredHoverInput) {
          //console.log('3o2ij received legal hoverInput, adding class');
          desiredHoverInput.addClass('cc-highlighted');

          /*if($(ui.item[0]).hasClass("fixWidth")){
          $(ui.item[0]).removeClass(" fixWidth");
          }
          var parent = desiredHoverInput.parent();
          while ($(parent).parent().attr("class").indexOf("statement-div") >= 0) {
            parent = $(parent).parent();
          }
          //console.log("Desired input is ", desiredHoverInput, " width: ", desiredHoverInput.css('width'));
          //console.log("Parent to display:", parent, parent.width());

         // console.log("I wish to make this length to parent", parent.width()+$(ui.item[0]).width() - 40);
          var width = parent.width() + $(ui.item[0]).width() - 40; // 40 is the assumed to be the width of the input element
          parent.width(width);*/
        }
      },
      isTypeMatch: function(expr, input) {
       // console.log('$$$$$$$$matching...', expr, input);
        if ( (expr.hasClass('integer-expr') || expr.hasClass("canvasObj-position") ||expr.hasClass("mouse-position"))&& input.hasClass('integer-input')) {
          return true;
        }// a+b, a<=b, a, b can only be boolean
        if (( expr.hasClass('boolean-expr') || expr.hasClass("boolean-not")|| expr.hasClass("boolean-operation") )&& input.hasClass('boolean-input')) 
        {
          //console.log("$$$$ qualified");
          return true;
        }// a && b, a ,b can be boolean or int
        if(input.hasClass("booleanNot-cmp") && (expr.hasClass("boolean-operation")||expr.hasClass("boolean-not")||expr.hasClass("integer-expr")||expr.hasClass("boolean-expr") || expr.hasClass("canvasObj-position")||expr.hasClass("mouse-position"))){
          return true;
        }// !a, a can be boolean or int
        if(input.hasClass("compositeControl")&& (expr.hasClass("boolean-operation")||expr.hasClass("boolean-not")||expr.hasClass("integer-expr")||expr.hasClass("boolean-expr") || expr.hasClass("canvasObj-position")||expr.hasClass("mouse-position"))) {// if it is for, while, if, assign's composite control input filed, all 5 types of variable page control can be added in
          return true;
        }
        if((input.hasClass("for-init") || input.hasClass("for-increment")) && expr.hasClass("assign-variable") ){
          return true;
        }// set x to 2 can only be put into non-conditional checking inputs
        return false;
      },
      inputEnterHandler: function(e) {
        // var self = this;
        // // console.log('a legit input has been entered', e.target);
        // if (window.COINCIDE.ProgramView.isSorting) {
        //   // console.log('dragging an expr and entered', window.COINCIDE.ProgramView.isSorting);
        //   // if (self.isTypeMatch(window.COINCIDE.ProgramView.isSorting, $(e.target))) {
        //     $(e.target).replaceWith(window.COINCIDE.ProgramView.isSorting);
        //   // }
        // }
      },
      didInsertElement: function() {
        var self = this;
        console.log("did insert element");
        this.droppableInit(self);
        this.sortableInit(self);
        // this.$().on('mouseenter', '.integer-input, .boolean-input', self.inputEnterHandler);
      }

    });

    return programView;
  });