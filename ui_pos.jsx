﻿// object that builds the UI, the back slashes are really anoyingres = "dialog {\				rulers: Group {\						orientation: 'row' , alignChildren: 'left',																													\						row_column: Panel {																																		  			\							text: 'Rows and Columns', alignChildren: 'right',																								  						\							row: Group {orientation: 'row' , s: StaticText { text:'Row'},  e: EditText{ characters: 4}}					   													\							column: Group {orientation: 'row' , s: StaticText {text:'Column'}, e: EditText {characters: 4}}																	\						},																																									  					\						width_height: Panel {																											 							 						\							text: 'Width and Height', alignChildren: 'right',																									  						\							width: Group { orientation: 'row' , s: StaticText{text: 'Width'}, e: EditText{characters: 4}},													 					\							height: Group { orientation: 'row', s: StaticText {text: 'Height'}, e: EditText{characters: 4}}																		\						},  																																	   													\						margins_gutters: Panel {																										   													  \							text: 'Margins and Gutters', alignChildren: 'right',																									  						\							margin: Group { s: StaticText{text: 'Margin'}, e: EditText{characters: 4}},					  																		 \							hgutter: Group { s: StaticText {text: 'hGutter'}, e: EditText{characters: 4}},	\							vgutter: Group { s: StaticText {text: 'vGutter'}, e: EditText{characters: 4}},    \						}  																																								 							\					},																								    																							  \				names: Group { 																																													\						alignChildren: 'fill',																																										\						orientation: 'row',																																											\						list: Panel { 																																												\							  text: 'List if Names', alignChildren: 'left', 																																		\							  name: Group { text: 'List of names', s: StaticText{ text: 'List'}, e: EditText{characters: 46}},							 											\							  size_shift: Group { s: StaticText {text: 'Text Shift'}, e: EditText{characters: 4}, s: StaticText{ text: 'Size'}, e: EditText{ characters: 4}}  					\							 }																																															\						},																																												      			\				character: Group {																																										              \					orientation: 'row',																																										  		\					alignment: 'fill',																																												    \					character: Panel { orientation: 'row',  text: 'Character', s: StaticText{text: 'Font'}, d: DropDownList{},  s: StaticText{text: 'Size'}, e: EditText{characters: 4}}  	 \																																																							\																																																							\																																																							\				}																																																		   \				buttons: Group {																																												        \					orientation: 'row',																																												   \					alignment: 'right',																																											       \					okBtn: Button { properties:{name:’ok’}, text:'OK'},																																	     \					cancelBtn: Button { properties:{name:'cancel'}, text:'Cancel'}																															\																																																							\				}																																																		   \		}";						win = new Window (res);win.center();// start the onClick event win.buttons.okBtn.onClick = function(){	// close the windows located to parents above	this.parent.parent.close(1); 	//alert(parseInt(win.rulers.width_height.width.e.text));	//alert(win.names.list.name.e.text.split(","));	//exit;			//define all —most— variables		var cl= app.activeDocument.activeLayer,		ad = app.activeDocument,		val = new UnitValue ("0 in"),		doc_width = val + parseFloat(win.rulers.width_height.width.e.text),		doc_height = val + parseFloat(win.rulers.width_height.height.e.text), 		dpi = 300,		row = win.rulers.row_column.row.e.text,		column = win.rulers.row_column.column.e.text,		names = win.names.list.name.e.text.split(","),		total = names.length;		master_loop = names.length / (row * column),		width = app.activeDocument.width.value, //need user input		height = app.activeDocument.height.value, // need user input		text_shift = 2,		t = 0,		text_hshift = width / 2,		margin = val + parseFloat(win.rulers.margins_gutters.margin.e.text), 		hgutter = val + parseFloat(win.rulers.margins_gutters.hgutter.e.text),		vgutter = val + parseFloat(win.rulers.margins_gutters.vgutter.e.text);				//alert(margin);		//exit;		// function to absolute position a layer. Assumes the layer is cetered.	 function pos(num, num2)	{				var width = app.activeDocument.width.value,		height = app.activeDocument.height.value;		b = app.activeDocument.activeLayer.bounds,		ob_width = b[2]-b[0],		ob_height = b[3]-b[1];		app.activeDocument.activeLayer.translate(-(width/2)+num+(ob_width/2),-(height/2)+num2+(ob_height/2));	}	// copy the original design	cl.copy();			//start the master loop, esch loop is a document	for ( i = 0; i < master_loop; i++) {				// record the current unit type and set it to inches		var startRulerUnits = app.preferences.rulerUnits;		app.preferences.rulerUnits = Units.INCHES;		//make the document, note that doc_width and doc_height needed and new UnitValue		doc = app.documents.add(doc_width, doc_height, 300, "Badger", NewDocumentMode.RGB);				//row and column loop prints the names too		for ( k = 0; k < row; k++) {			for( j = 0; j < column; j++) {								doc.artLayers.add();				doc.paste(0);								a = app.activeDocument.activeLayer;				if ( j == 0 && k == 0) {					pos( j*width+margin,k*height+margin);				} else {					pos( j*width+margin+( hgutter*j ),k*height+margin+( vgutter*k ));				}							//add layers and make the test, set the size, center it, and position it				text = app.activeDocument.artLayers.add();				text.kind = LayerKind.TEXT;				text.textItem.size = 20;				text.textItem.contents = names[t];				text.textItem.justification = Justification.CENTER;				text.textItem.position = [j*width+margin+text_hshift+(hgutter*j),k*height+margin+text_shift+(vgutter*k)];				t++;			}		}		// set the UnitValue back to how it was for each document		preferences.rulerUnits = startRulerUnits;	}		// end of the onlClick		}win.show();