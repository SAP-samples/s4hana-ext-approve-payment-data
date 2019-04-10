sap.ui.define([
	], function () {
		"use strict";
		return {
			
			/**
             * Enables or disables an input field according to the given status
             * @public
             * @param {string} sStatus in a string
             * @returns {boolean} if the input should be disabled or enabled
             */
			formatInput: function(sStatus) {
				if (sStatus === "ToBeDeleted") {
					return false;
				}
				return true;
			},
			
			/**
             * Colorcoding of the Status
             * @public
             * @param {string} sStatus in a string [ToBeCreated, ToBeDeleted, ToBeChanged]
             * @returns {string} Status of the ObjectStatus [Success, Warning, Error, None]
             */
			formatStatus: function(sStatus) {
				switch (sStatus) {
				case "ToBeCreated":
					return "Success";
				case "ToBeDeleted":
					return "Error";
				case "ToBeChanged":
					return "Warning";
				default:
					return "None";
				}	
			},
			
			/**
             * Return the translation of the given sStatus using i18n Resource Bundle
             * @public
             * @param {string} sStatus in a string [ToBeCreated, ToBeDeleted, ToBeChanged]
             * @returns {string} humanreadable Status
             */					
			formatStatusText: function(sStatus) {
				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
				switch (sStatus) {
					case "ToBeCreated":
						return oResourceBundle.getText("created");
					case "ToBeDeleted":
						return oResourceBundle.getText("deleted");
					case "ToBeChanged":
						return oResourceBundle.getText("changed");
					default:
						return sStatus;
				}	
			},

			/**
             * Return the name of the country of a given ISO Code
             * @public
             * @param {string} sISOCode of a country
             * @returns {string} Country name
             */					
			formatCountry: function(sISOCode) {
				if(!sISOCode){
					return undefined;
				}
				var mod = this.getView ? this.getView().getModel("countriesISOModelJSON") : this._oCountryModel;

				if(!mod.getData().d){
					mod.pSequentialImportCompleted.then(function () {
						this.getView().getModel().refresh("countriesISOModelJSON");
					}.bind(this));
					return undefined;
				}

				var oCountry = mod.getData().d.results.find(function (oArrayItem) {
					return oArrayItem.Country === sISOCode;
				});
				
				// if there is a country Name (Full name) available it is returned
				if(oCountry.CountryName) {
					return oCountry.CountryName;
				}
				
				// otherwise the ISO code is the return value
				return oCountry.Country;
			}
		};

	}
);