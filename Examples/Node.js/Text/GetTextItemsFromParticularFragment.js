// ExStart:1
var fs = require('fs');
var assert = require('assert');
var PdfApi = require('asposepdfcloud');
var StorageApi = require('asposestoragecloud');
var configProps = require('../config/config.json');
var data_path = '../../../Data/';

var AppSID = configProps.app_sid;
var AppKey = configProps.api_key;
var outFolder = configProps.out_folder;
var config = {'appSid':AppSID,'apiKey':AppKey , 'debug' : true};

// Instantiate Aspose Storage API SDK
var storageApi = new StorageApi(config);
// Instantiate Aspose.Pdf API SDK
var pdfApi = new PdfApi(config);

// Set input file name
var name = "sample-input.pdf";
var pageNumber = 1;
var fragmentNumber = 1;

try {
// Upload source file to aspose cloud storage
storageApi.PutCreate(name, null, null, data_path + name , function(responseMessage) {

	assert.equal(responseMessage.status, 'OK');

	// Invoke Aspose.Pdf Cloud SDK API to get all text items from a particular fragment
	pdfApi.GetFragment(name, pageNumber, fragmentNumber, null, null, null, function(responseMessage) {
			assert.equal(responseMessage.status, 'OK');
			responseMessage.body.TextItems.List.forEach(function(textItem) {
			console.log("Text :: " +  textItem.Text);
			});

		});
	});

}catch (e) {
  console.log("exception in example");
  console.log(e);
}
//ExEnd:1