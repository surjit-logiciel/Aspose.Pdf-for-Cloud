﻿using System;
using Com.Aspose.PDF.Api;
using Com.Aspose.PDF.Model;
using Com.Aspose.Storage.Api;
using System.Collections.Generic;

namespace Form_Fields
{
    class CreateField
    {
        public static void Run()
        {
            // ExStart:1
            PdfApi pdfApi = new PdfApi(Common.APP_KEY, Common.APP_SID, Common.BASEPATH);
            StorageApi storageApi = new StorageApi(Common.APP_KEY, Common.APP_SID, Common.BASEPATH);

            string fileName = "test.pdf";
            int? page = 1;
            string storage = null;
            string folder = null;

            Com.Aspose.PDF.Model.Field body = new Com.Aspose.PDF.Model.Field();



            Com.Aspose.PDF.Model.Link link = new Com.Aspose.PDF.Model.Link();
            link.Href = "http://api.aspose.cloud/v1.1/pdf/ABFillablewfields.pdf/fields/NewField";
            link.Rel = "self";
            link.Title = "NewField";
            link.Type = "link";

            Com.Aspose.PDF.Model.Rectangle rect = new Com.Aspose.PDF.Model.Rectangle();
            rect.X = 0;
            rect.Y = 0;

            body.Name = "FieldType0";
            body.Values = new System.Collections.Generic.List<string> { "NewFieldValue" };
            body.Rect = rect;
            body.SelectedItems = new System.Collections.Generic.List<int?> { 1 };
            body.Type = 0;
            body.Links = new System.Collections.Generic.List<Com.Aspose.PDF.Model.Link> { link };


            try
            {
                // Upload source file to aspose cloud storage
                storageApi.PutCreate(fileName, "", "", System.IO.File.ReadAllBytes(Common.GetDataDir() + fileName));

                // Invoke Aspose.PDF Cloud SDK API to create form field
                SaaSposeResponse apiResponse = pdfApi.PostCreateField(fileName, page, storage, folder, body);

                if (apiResponse != null && apiResponse.Status.Equals("OK"))
                {                   
                    Console.WriteLine("Create a Form Field in a PDF Document, Done!");
                    Console.ReadKey();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("error:" + ex.Message + "\n" + ex.StackTrace);
            }
            // ExEnd:1
        }
    }
}
