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
var name = "Sample-xml.pdf";
var templateFile = "sample.xsl";
var dataFile = "sample.xml";
var templateType = "xml";

try {
// Upload file to aspose cloud storage
storageApi.PutCreate(templateFile, null, null, data_path + templateFile , function(responseMessage) {
	assert.equal(responseMessage.status, 'OK');

	// Invoke Aspose.Pdf Cloud SDK API to create PDF file from XML
	pdfApi.PutCreateDocument(name, templateFile, dataFile, templateType, null, null, function(responseMessage) {
			assert.equal(responseMessage.status, 'OK');
			
 			// Download pdf from cloud storage
			storageApi.GetDownload(name, null, null, function(responseMessage) {
				assert.equal(responseMessage.status, 'OK');
				var writeStream = fs.createWriteStream(data_path  + "Sample-xml_out.pdf");
				writeStream.write(responseMessage.body);
				});
		});
	});

}catch (e) {
  console.log("exception in example");
  console.log(e);
}
//ExEnd:1