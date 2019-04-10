sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/ui/model/json/JSONModel"
], function (MockServer, JSONModel) {
	"use strict";
	return {
		init: function () {
			// create
			var rootUri = "/";

			var oUriParameters = jQuery.sap.getUriParameters();
			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 1000
			});

			var oMockServer = new MockServer({
				rootUri: rootUri,
				requests: this.getRequests()
			});

			// start
			oMockServer.start();

			//to simulate the coutnries odata
			var oMockServerForCountrOdata =  new MockServer({
				rootUri: "/html5apps/changepaymentdata/Workflow_CXT/sap/opu/odata/sap/YY1_COUNTRIES_ISO_CDS/"
			});
			var sJsonFilesUrl = jQuery.sap.getModulePath("com/sap/workflow/ChangePaymentData/localService/mockdata"),
				sMetadataUrl = jQuery.sap.getModulePath(("com/sap/workflow/ChangePaymentData/localService/metadata.xml").replace(".xml", ""), ".xml");
			oMockServerForCountrOdata.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sJsonFilesUrl,
				bGenerateMissingMockData: true
			});
			oMockServerForCountrOdata.start();
		},
		
		getRequests: function () {
			var request =  [];
			
			var oModel = new JSONModel();
			oModel.loadData("./localService/mockdata/examplePaymentData.json", null , false);
			
			request.push({
			      method: "GET",
			      path: new RegExp("(.*)context"),
			      response: function(oXhr/*, sUrlParams*/) {
			      	oXhr.respondJSON(200, {}, oModel.getJSON());
			        return true;
			      }
			});

            var oCountryModel = new JSONModel();
            oCountryModel.loadData("./localService/mockdata/countries.json", null , false);

            request.push({
                method: "GET",
                path: new RegExp("(.*)YY1_COUNTRIES_ISO"),
                response: function(oXhr/*, sUrlParams*/) {
                    oXhr.respondJSON(200, {}, oCountryModel.getJSON());
                    return true;
                }
            });
			
			return request;
		}
		
	};
});