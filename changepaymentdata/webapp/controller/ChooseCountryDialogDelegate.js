sap.ui.define([
	"sap/ui/base/EventProvider",
	"sap/ui/model/Filter"
], function (EventProvider, Filter) {
	"use strict";

	return EventProvider.extend("com.sap.workflow.ChangePaymentData.controller.ChooseCountryDialogDelegate", {
		_sFragmentName: "com.sap.workflow.ChangePaymentData.view.ChooseCountryDialog",
		_oFragment: null,
		_sFragmentId: null,
		_oModel:null,
		_oCountryModel:null,
		_sBindingPath: null,
		_fnOnChooseCountry:null,

		/**
		 * Event handler called when country is selected. It sets the country in the model.
		 * @private
		 */
		onChooseCountry: function (oEvent) {
			var oListItem = oEvent.getParameter("listItem");
			var oCtx = oListItem.getBindingContext("countriesISOModelJSON");
			var oCountry = oCtx.getObject();

			// set the defaul model, ISO code of the country to do the patch request
			this._oModel.setProperty(this._sBindingPath + "/BankCountryKey", oCountry.Country);
			
			// reset the bank selection
			this._oModel.setProperty(this._sBindingPath + "/BankNumber", "");
			this._oModel.setProperty(this._sBindingPath + "/BankName", "");
			this._oModel.setProperty(this._sBindingPath + "/SWIFTCode", "");
			
			this.close();

			this._fnOnChooseCountry();
		},

		/**
		 * Event handler called when cancel button is chosen. Nothing to do in case of cancel but closing the dialog.
		 * @private
		 */
		onCancel: function () {
			this.close();
		},

		/**
		 * Event handler called delegate is instantiated. Not used but kept for future reference.
		 * @private
		 */
		onInit: function () {
		},

		/* =========================================================== */
		/* Helper functions (can be moved to BaseDelegate)             */
		/* =========================================================== */

		/**
		 * Called when the delegate is instantiated.
		 * @param {object} oModel is the main model used in the project (context from workflow)
		 * @param {object} oCountryModel is the model to fetch the countries CDS.
		 * @param {object} fnOnAfterSave is the callback function that is to be called after successful save.
		 * @private
		 */
		constructor: function (oModel, oCountryModel, fnOnChooseCountry) {
			sap.ui.base.EventProvider.prototype.constructor.apply(this, arguments);
			this._oModel = oModel;
			this._oCountryModel = oCountryModel;
			this._fnOnChooseCountry = !fnOnChooseCountry ? function () {
				// in case callback func is not provided,
			} : fnOnChooseCountry;
		},

		/**
		 * Sets the binding path for the view.
		 * It also handles clearing the search field and selecting the corresponding (according to binding) country.
		 * @private
		 */
		setBindingPath: function (sBindingPath) {
			this._sBindingPath = sBindingPath;

			var sCountryISOCode = this._oModel.getProperty(
				this._sBindingPath + "/BankCountryKey");

			// set the current country as selected item in the list
			this.byId("searchField").setValue(null);
			this.byId("searchField").fireLiveChange({newValue:""});

			var oList = this.byId("idChooseCountryList");
			var oItems = oList.getItems();
			var oCurrentCountryListItem = oItems.find(function (oItem) {
				return oItem.getProperty("title") === sCountryISOCode;
			});

			oList.removeSelections();
			if(typeof oCurrentCountryListItem !== "undefined") {
				oList.setSelectedItem(oCurrentCountryListItem);
			}
		},

		/**
		 * Event handler called when user searches a country in the value help dialog.
		 * This function needs to set the filter with the query to perform the search operation.
		 * @public
		 */
		onSearch: function (oEvent) {
			// add filter for search
			var sQuery = oEvent.getParameter("newValue");
			var oBinding= this.byId("idChooseCountryList").getBinding("items");
			if (sQuery) {
				oBinding.filter([new sap.ui.model.Filter([ // a filter which applies OR condition
					new Filter("CountryName", sap.ui.model.FilterOperator.Contains, sQuery),
					new Filter("Country", sap.ui.model.FilterOperator.Contains, sQuery)],
					false)], "Application");
			} else{ // then clear the filters
				oBinding.filter([], "Application");
			}
		},

		/**
		 * Called when the delegate is destroyed.
		 * @private
		 */
		destroy: function () {
			// Invoke lifefycle hook
			this.onExit();

			// Destroy objects
			if (this._oFragment) {
				// Detach other lifecycle hooks
				this._oFragment.removeEventDelegate(this, this);
				this._oFragment.destroy();
			}

			// Reset properties
			this._oFragment = null;

			sap.ui.base.EventProvider.prototype.destroy.apply(this, arguments);
		},

		/**
		 * Event handler called before the view is rendered.
		 * It is not used here, but rather kept for future implementation as a reference.
		 * @private
		 */
		onBeforeRendering: function () {
		},

		/**
		 * Event handler called after the view is rendered.
		 * It is not used here, but rather kept for future implementation as a reference.
		 * @private
		 */
		onAfterRendering: function () {
		},

		/**
		 * Event handler called on exit.
		 * It is not used here, but rather kept for future implementation as a reference.
		 * @private
		 */
		onExit: function () {
		},

		/**
		 * Called to create a fragment and invoke the lifecyle hooks.
		 * @private
		 */
		_createFragment: function () {
			$.sap.assert(this._sFragmentName, "Trying to instantiate fragment but fragmentName is not provided.");
			this._sFragmentId = $.sap.uid();
			this._oFragment = sap.ui.xmlfragment(this._sFragmentId, this._sFragmentName, this);

			// Invoke lifecycle hook
			this.onInit();

			// Register other looks like onBeforeRendering, etc.
			this._oFragment.addEventDelegate(this, this);

			return this._oFragment;
		},

		/**
		 * Helper method to implement getter by id method.
		 * It is available in the normal view by UI5, but has to be explicitly implemented for delegates.
		 * @param {string} sId is the id of the component that dev wants to obtain
		 * @private
		 */
		byId: function (sId) {
			return sap.ui.core.Fragment.byId(this._sFragmentId, sId);
		},

		/**
		 * Helper method to get fragment.
		 * It invokes create function if fragment does not exist.
		 * @private
		 */
		getFragment: function () {
			if (!this._oFragment) {
				this._createFragment();
			}
			return this._oFragment;
		},

		/**
		 * Helper method to open the dialog conveniently.
		 * @private
		 */
		open: function () {
			this.getFragment().open();
		},

		/**
		 * Helper method to close the dialog conveniently.
		 * @private
		 */
		close: function () {
			this.getFragment().close();
		}

	});
});