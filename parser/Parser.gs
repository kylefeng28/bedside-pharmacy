var projectId = 'drug-reference-f3c33';
var url = 'https://' + projectId + '.firebaseio.com/' + 'Sedation.json'; //+ 'drugs.json';
var data;
var sheet;
var rows;
var columns;
var r;
var c;
var innerData;
var drug;
var drug_name;
var alphaExcel = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var ui = SpreadsheetApp.getUi();
var errMsg;
var warnings;
var reformattedData;
var columnsEmpty;
var cache;
//SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sedation").activate();
function onOpen() {
  ui = SpreadsheetApp.getUi()
  var ss = SpreadsheetApp.getActive();
  ui
  .createMenu('Parse and Sync')    
  .addItem('Sync Current Tab', 'testTab')
  .addItem('Sync All Tabs', 'iterateTabs')
  .addItem('Show alert', 'showAlerts')
  .addToUi();
}
function showAlerts(){
 var html = HtmlService.createHtmlOutput(PropertiesService.getScriptProperties().getProperty('log'))
      .setTitle('Alerts')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
  //ui.alert(PropertiesService.getScriptProperties().getProperty('log'));
}
function testTab(){
    alphaExcel = alphaExcel.split("");
    errMsg = "---ERRORS---\n";
    warnings = "\n---WARNINGS---\n";
    setSheet(SpreadsheetApp.getActiveSheet());
    url = 'https://' + projectId + '.firebaseio.com/drugs/' + parseSheetName(sheet.getName()) + '.json';
     try{
       if(sheet.getName() == "References"){
           parseReferenceTab()
       } else if(sheet.getName() == "ANTIBIOTICS AND ORGANISMS"){
           parseAntibioticsTab();
       } else{
           if(sheet.getName() == "Testing"){
             url = 'https://' + projectId + '.firebaseio.com/' + parseSheetName(sheet.getName()) + '.json';
           }
           parseNormalTab();
       }
     } catch (err){
       errMsg += err + "Unexpected error in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n"; 
       //Logger.log(err + "\n");
       //Logger.log(err.stack);
       //Logger.log(data[r][c]);
     }
     //ui.alert(errMsg + warnings);    
     PropertiesService.getScriptProperties().setProperty('log', errMsg+warnings);
     showAlerts();
}
function iterateTabs() {
    alphaExcel = alphaExcel.split("");
	var allSheets = SpreadsheetApp.getActive().getSheets();
	var tabname;
    var tabs = ""
    errMsg = "";
	for (var s in allSheets) {
        warnings = "\n---WARNINGS---\n";
		setSheet(allSheets[s]);
        errMsg += "**************************************\nParsing " + sheet.getName() + "\n" +"---ERRORS---\n";
		url = 'https://' + projectId + '.firebaseio.com/drugs/' + parseSheetName(sheet.getName()) + '.json';
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet.getName()).activate();
		if (sheet.getName() == "STYLE GUIDE") {
		}else if(sheet.getName() == "References"){
          url = 'https://' + projectId + '.firebaseio.com/' + parseSheetName(sheet.getName()) + '.json';
          try{
              parseReferenceTab();
          } catch (err){
            errMsg += err + "Unexpected error in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n"; 
          }
        }else if(sheet.getName() == "ANTIBIOTICS AND ORGANISMS"){
          try{
            parseAntibioticsTab();
          } catch (err){
            errMsg += err + "Unexpected error in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n"; 
            //Logger.log(sheet.getName() + "\n" + JSON.stringify(reformattedData));
          }
        }
        else{ //if(sheet.getName() == "ANTIARRYTHMICS"){
            if(sheet.getName() == "Testing"){
               url = 'https://' + projectId + '.firebaseio.com/' + parseSheetName(sheet.getName()) + '.json';
            }else{
			SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet.getName()).activate();
            Logger.log("Parsing " +sheet.getName());
            //if(sheet.getName() == "SEDATION"){
                try{
                    parseNormalTab();
                } catch (err){
                    errMsg += err + "Unexpected error in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n"; 
                    //Logger.log(err + "\n");
                    //Logger.log(err.stack);
                    //Logger.log(data[r][c]);
                }
            //}
            }
		} 
        errMsg += warnings;
	}
    //ui.alert(errMsg);
    //SpreadsheetApp.getActiveSpreadsheet().getSheetByName("STYLE GUIDE").activate();
    //PropertiesService.getScriptProperties().setProperty('log', errMsg+warnings);
    //showAlerts();
}
function parseNormalTab() {
	//var projectId = 'testing-ac10d';
	//var projectId = 'test-2019-03-07';
	setData(sheet.getRange(1, 1, rows, columns).getValues()); // starts at 1 ew 
	// build new data object 
	reformattedData = {};
	// for each drug, parse [class, ..., warnings] // we will refer to them as columns 0-4
    var added = "";
    var phase = 0;
	reformattedData["labels"] = data[0].slice(1).map(function (str) { //takes labels, caps first letter, lowercase all others
        if(str == null || str.equals("")){
             phase++;
             added = "There should be no cells past the last column header (last entry in row 1)\n";     
        }else{
            if(phase == 1){
                phase++;
            }
            if(phase <= 2){
              return str.split('/').map(function (indiv) {
                  return indiv.charAt(0) + indiv.slice(1).toLowerCase();
              }).join('/');
            }
        }
	});
    /*var blankCell = false;
    for(var i;blankCell == false; i++){
        reformattedData["labels"]. = labels[i];
    }*/
    columns = reformattedData["labels"].length;
    errMsg += added;
	var mostRecentSubclassName = "_"
	innerData = {};
    checkSubclass();
	for (r = 1; r < rows; r++) {
		// if columns are empty, is a subclass name; otherwise is a drug name (add to most recent subclass)
		if (columnsEmpty[r]) {
			if (data[r][0] != "") {
				mostRecentSubclassName = parseMultiWordCaps(data[r][0]);
				innerData = {};
			}
		} else {
			parseRow();
			reformattedData[mostRecentSubclassName] = innerData;
		}
	}
    syncToFirebase();
}
function checkSubclass(){
    columnsEmpty = new Array(rows);
	for (r = 1; r < rows; r++) {
		columnsEmpty[r] = true;
		for (var c = 1; c < columns && columnsEmpty[r]; c++) {
			if (!(data[r][c] =="")) {
				columnsEmpty[r] = false;
			}
		}
	}
}
function parseRow() {
	// add data. check for drug name/description in column 0
	for (c = 0; c <= columns; c++) {
		parseCell();
	}
}
function parseCell() {
	if (c == 0) {
		parseDrugName();
	} else {
        //if (sheet.getName() == "SEDATION") {
            parseInfo();
            innerData[parseMultiWordCaps(parseWhiteSpace(drug_name))] = drug;
        /*} else {
            innerData[parseMultiWordCaps(parseWhiteSpace(drug_name))] = "";
        }*/
		
	}
	
}
function getAlphaNum(column){
    var result = "";
    while(column >= 26){
        result += alphaExcel[column/26];
        column -= (column/26)*26;
    }
    result += alphaExcel[column];
    return result;
}
function parseDrugName() {
	if (!data[r][c].equals("")) {
		// separate bold and not bold text
		var separateText = sheet.getRange(r + 1, 1).getRichTextValue().getRuns();  //getRuns separates by format   
		if(separateText.length > 2){
		    errMsg += "Unexpected Extra formatting in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n" +
                      "expects only 2 formats in drug name cell, the second being Italics\n";
		}
		drug_name = "";
		var description = "";
		var brand_name = "";
		for (var i = 0; i < separateText.length; i++) {
			var text = separateText[i].getText();
			if (i== 1) { // Description //Sedation isn't formatted correctly so just correct it later This is supposed to be italics
				description = text;
			} else { // this text should be a header
				if (text.indexOf('(') != -1) { //if there is a brandname, parse for it
					brand_name = text.slice(text.indexOf('(') + 1, text.indexOf(')'));
					drug_name = text.slice(0, text.indexOf('('));
				} else if (drug_name.equals("")) {
					brand_name = "_";
					drug_name = text;
				}
			}
		}
		// instantiate drug
		drug = { "Description": parseMultiWordCaps(description) };
		drug["Brand Name"] = parseWhiteSpace(brand_name);
        Logger.log(drug_name);
        if(parseWhiteSpace(drug_name).indexOf("\n") != -1){
            throw "Error: Unexpected new line in Drug name. Cell (" + (r+1) + "," + getAlphaNum(c) + ")\n";
        }        
	}
}
function parseInfo(){
	if(drug_name != null && drug_name.equals("")){
		throw "No Drug Name For Info on Row: " + (r+1);
	}
	if (data[r][c] != null && !data[r][c].toString().equals("")) {
		// add data under respective (c-1) label
		// split bold (header) data and non-bold data (info, separated by \n)
        try{
            var range = sheet.getRange(r+1, c+1).getRichTextValue();
            var separateText = range.getRuns();

        }catch (err){
            errMsg += "**Important: Cells cannot contain solely numbers (e.g. 123).\n Number in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n"  
            throw "";
        }
		if(c == 1){
			parseClassMechanismCell(separateText);
		} else{
			parseNotClassMechanismCell(separateText);
		}
	}
}
function parseNotClassMechanismCell(separateText){
	for (var j = 0; j < separateText.length; j++) { //make sure this passes inline bolds
		if (separateText[j].getTextStyle().isBold()) {
			//Only a header if it is bold and has a newline with it
			try{
				parseTopicInfo(separateText[j].getText(), separateText[j+1].getText());
			} catch(err){
				warnings += "Warning: Topic without Description in cell (" + (r+1) + "," + getAlphaNum(c) + ")\n" + 
                          "Topic:" + separateText[j].getText() + "\n";
				parseTopicInfo(separateText[j].getText(), "_");
			}
			j++;
		} else {
			warnings += "Warning: Description without topic in cell (" + (r+1) + "," + getAlphaNum(c) + ")" + "\n" +
                      "Description: " + separateText[j].getText() + "\n";
			parseNoTopicInfo(separateText[j].getText());
		}
	}
}
function parseClassMechanismCell(separateText){
	var whole_string = "";
	for (var j = 0; j < separateText.length; j++) { //make sure this passes inline bolds
		var singleText = separateText[j].getText();
		if (separateText[j].getTextStyle().isBold()) {
			//Only a header if it is bold and has a newline with it
			 singleText = "@" + singleText + "@";
		}
		whole_string += singleText;
	}
	parseNoTopicInfo(whole_string);
}
function parseNoTopicInfo(description){
	parseTopicInfo("_", description);
}
function parseTopicInfo(topic, description){
	topic = formatTopic(topic);
    if(topic.equals("")){
        errMsg += "Topic String is Empty in (" + (r+1) + "," + getAlphaNum(c) + "), Replaced with _\n";
        topic = "_";
    }
	description = parseWhiteSpace(description);
	if(description.indexOf('\n') != -1){
		description = description.split('\n');
	}
	parseIntoDrug(topic, description);
}
function formatTopic(str){
    str = parseFirebaseIllegals(parseWhiteSpace(str));
    return str.replace(":", "");
}
function parseIntoDrug(topic, description){
	if(drug[(c-1)] == null){
		var newData = {};
		newData[topic] = description;
		drug[(c-1)] = newData;
	} else {
		drug[(c-1)][topic] = description;
	}
}

function parseWhiteSpace(toCut) {
	while (toCut.substring(0, 1).equals("\n") || toCut.substring(0, 1).equals(" ") || toCut.substring(0, 1).equals("\r")) {
		toCut = toCut.substring(1);
	}
	while (toCut.substring(toCut.length - 1).equals("\n") || toCut.substring(toCut.length - 1).equals(" ") || toCut.substring(toCut.length -1).equals("\r")) {
		toCut = toCut.substring(0, toCut.length - 1);
	}
	return toCut;
}
function parseMultiWordCaps(str) {
	str = str.split(" ").map(function (substr) {
		return substr.split("-").map(function (substr2) {
			return parseUpperFirst(substr2);
		}).join('-');
	}).join(" ");
	return str;
}
function parseUpperFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function parseFirebaseIllegals(toCut) {
	toCut = toCut.replace(/\//g, "*").replace(/\./g, '^').replace(/\[/g, '{').replace(/\]/g, '}').replace(/\n/g, '');
    return toCut.split("*").map(function(parts){
        return parts.split(" ").map(function(str){
            return parseUpperFirst(str);
        }).join(" ");
    }).join("*");
}
function parseSheetName(sheet_name){
    return parseFirebaseIllegals(parseMultiWordCaps(sheet.getName()));
}
function setSheet(_sheet) {
	sheet = _sheet;
	[rows, columns] = [sheet.getLastRow(), sheet.getLastColumn()];
}
function setData(_data) {
	data = _data;
}
function getData() {
	return data;
}
function parseAntibioticsTab(){
    setData(sheet.getRange(1, 1, rows, columns).getValues());
    reformattedData = {};
    reformattedData["Bacteria"] = {};
    reformattedData["Antibiotics"] = {};
    checkSubclass();
    for(r = 1; r< rows; r++){
        if (columnsEmpty[r]) {
			if (data[r][0] != "") {
				mostRecentSubclassName = data[r][0];
                reformattedData["Bacteria"][mostRecentSubclassName] = {}
			}
		} else {
            parseBacteriaRow();
        }
    } 
    for(c = 1; c< columns; c++){
        parseAntibioticColumn();
    }
    syncToFirebase();
}
function parseAntibioticColumn(){
    var recommended = [];
    var active = [];
    var variable = [];
    var notRecommended = [];
    var unknown = [];
    for(r=1; r< rows; r++){
        if(data[r][c] == 0){
            notRecommended.push(data[r][0]);
        } else if(data[r][c].equals("aa")){
            recommended.push(data[r][0]);
        } else if(data[r][c].equals("a") ){
            active.push(data[r][0]);
        } else if(data[r][c].equals("b") ){
            variable.push(data[r][0]);
        }  else if(data[r][c].equals("?")){
            unknown.push(data[r][0]);
        } else {
            throw "Unexpected: "+ data[r][c]
        }
    }
    var col_data = {};
    col_data["Recommended"] = recommended.sort();
    col_data["Active"] = active.sort();
    col_data["Variable"] = variable.sort();
    col_data["Not Recommended"] = notRecommended.sort();
    col_data["Unknown or Insufficient Data"] = unknown.sort();
    reformattedData["Antibiotics"][parseFirebaseIllegals(data[0][c])] = col_data;
}
function parseBacteriaRow(){
    var recommended = [];
    var active = [];
    var variable = [];
    var notRecommended = [];
    var unknown = [];
    for(c=1; c< columns; c++){
        if(data[r][c] == 0){
            notRecommended.push(data[0][c]);
        } else if(data[r][c].equals("aa")){
            recommended.push(data[0][c]);
        } else if(data[r][c].equals("a")){
            active.push(data[0][c]);
        } else if(data[r][c].equals("b") ){
            variable.push(data[0][c]);
        } else if(data[r][c].equals("?") ){
            unknown.push(data[0][c]);
        } else {
            throw "Unexpected: " + data[r][c]
        }
    }
    var row_data = {};
    row_data["Recommended"] = recommended.sort();
    row_data["Active"] = active.sort();
    row_data["Variable"] = variable.sort();
    row_data["Not Recommended"] = notRecommended.sort();
    row_data["Unknown or Insufficient Data"] = unknown.sort();
    reformattedData["Bacteria"][mostRecentSubclassName][parseFirebaseIllegals(data[r][0])] = row_data;
}
function parseReferenceTab(){
    setData(sheet.getRange(1, 1, rows, columns).getValues());
    reformattedData = {};
    c = 1;
    for(r = 0; r < rows; r++){
        reformattedData[r] = data[r][c];
    }
    syncToFirebase();
}
function syncToFirebase(){
    console.log(sheet.getName() + "\n" +JSON.stringify(reformattedData));
	var demoData = {
		'demo': {
			'time': '' + new Date()
		}
	};
	var options = {
		'method': 'put',
		'payload': JSON.stringify(reformattedData),
		//'muteHttpExceptions': true,
	};
	var response = UrlFetchApp.fetch(url, options);
}
//  ui.alert(response.getContentText());  
/*
function syncToFirebase() {
	var ui = SpreadsheetApp.getUi();
	ui.alert('Note: sync functionality is not fully implemented yet, this is just a demo');
	var response = ui.prompt('Confirm sync', 'Ok to overwrite existing Firebase data?', ui.ButtonSet.YES_NO);
	
	var projectId = 'drug-reference-f3c33';
	var url = 'https://' + projectId + '.firebaseio.com/' + 'drugs.json';

	// var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	// SpreadsheetApp.setActiveSheet()
	
	var demoData = {
		'demo': {
			'time': '' + new Date()
		}
	};
	
	var options = {
		'method': 'post',
		'payload': JSON.stringify(demoData),
		// 'muteHttpExceptions': true,
	};

	var response = UrlFetchApp.fetch(url, options);
	ui.alert(response.getContentText());
	
	if (response.getSelectedButton() == ui.Button.YES) {
		Logger.log('yes');
	} else if (response.getSelectedButton() == ui.Button.NO) {
		Logger.log('no');
	} else {
		Logger.log('The user clicked the close button in the dialog\'s title bar.');
	}

}
*/