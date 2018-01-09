//ExStart:
<?php
require_once __DIR__ . '/vendor/autoload.php';

use Aspose\Storage\StorageApi;
use Aspose\Storage\AsposeApp;

class Utils {
	# Get App key and App SID from https://cloud.aspose.com
	const appSID = "bc07ef2d-2758-4366-b132-8e56deca1a3e";
	const apiKey = "c919ddf6da91157a279fea75fb867fc4";

	public static function uploadFile($fileName) {
		AsposeApp::$appSID = Utils::appSID;
		AsposeApp::$apiKey = Utils::apiKey;

		$storage = new StorageApi();

		$file = realpath(__DIR__ . '/../..') . '/Data/' . $fileName;
        $result = $storage->PutCreate($Path=$fileName, $versionId = null, $storage = null, $file); 
	} 
}

?>
//ExEnd:
