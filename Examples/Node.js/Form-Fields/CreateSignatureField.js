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
var name = "test.pdf";
var page = 1;
	
var fieldbody = {
		'Name' : 'Signature1',
		'Values' : [''],
		'Type' : 'Text',
                'Links' : ['http://api.aspose.cloud/v1.1/pdf/ABFillablewfields.pdf/fields/NewField'],
                'SelectedItems' : [1],
		'Rect' : {
			'X' : 100,
			'Y' : 100,
			'Height' : 100,
			'Width' : 200
		}
		
	};

try {
// Upload file to aspose cloud storage
storageApi.PutCreate(name, null, null, data_path + name , function(responseMessage) {

	assert.equal(responseMessage.status, 'OK');

	// Invoke Aspose.Pdf Cloud SDK API to create form field in a PDF document
	pdfApi.PostCreateField(name, page, null, null, fieldbody, function(responseMessage) {			
			assert.equal(responseMessage.status, 'OK');
				// Download generated pdf from storage server
				storageApi.GetDownload(name, null, null, function(responseMessage) {
					assert.equal(responseMessage.status, 'OK');
					var writeStream = fs.createWriteStream(data_path + "SignatureField.pdf");
					writeStream.write(responseMessage.body);
					});
			

			});
	});

}
catch (e) 
{
  console.log("exception in example");
  console.log(e);
}
//ExEnd:1