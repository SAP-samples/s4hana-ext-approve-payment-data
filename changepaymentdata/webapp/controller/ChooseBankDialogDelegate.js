sap.ui.define([
	"sap/ui/base/EventProvider",
	"sap/ui/model/Filter"
], function (EventProvider, Filter) {
	"use strict";

	return EventProvider.extend("com.sap.workflow.ChangePaymentData.controller.ChooseBankDialogDelegate", {
		_sFragmentName: "com.sap.workflow.ChangePaymentData.view.ChooseBankDialog",
		_oFragment: null,
		_sFragmentId: null,
		_oModel:null,
		_oBankModel:null,
		_sBindingPath: null,
		_fnOnChooseBank:null,
		_sSelectedCountry:null,

		/**
		 * Event handler called when bank is selected. It sets the bank in the model.
		 * @private
		 */
		onChooseBank: function (oEvent) {
			var oListItem = oEvent.getParameter("listItem");
			var oCtx = oListItem.getBindingContext("bankModel");
			var oBank = oCtx.getObject();

			// set the default model, internalId of the bank to do the patch request
			this._oModel.setProperty(this._sBindingPath + "/BankNumber", oBank.BankInternalID);
			this._oModel.setProperty(this._sBindingPath + "/BankName", oBank.BankName);
			this._oModel.setProperty(this._sBindingPath + "/SWIFTCode", oBank.SWIFTCode);
			this.close();

			this._fnOnChooseBank();
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
		 * @param {object} oBankModel is the model to fetch the banks CDS.
		 * @param {object} fnOnAfterSave is the callback function that is to be called after successful save.
		 * @private
		 */
		constructor: function (oModel, oBankModel, fnOnChooseBank) {
			sap.ui.base.EventProvider.prototype.constructor.apply(this, arguments);
			this._oModel = oModel;
			this._oBankModel = oBankModel;
			this._fnOnChooseBank = !fnOnChooseBank ? function () {
				// in case callback func is not provided,
			} : fnOnChooseBank;
		},

		/**
		 * Sets the binding path for the view.
		 * It also handles clearing the search field and selecting the corresponding (according to binding) bank.
		 * @private
		 */
		setBindingPath: function (sBindingPath) {
			this._sBindingPath = sBindingPath;

			var sBankNumber = this._oModel.getProperty(
				this._sBindingPath + "/BankNumber");

			// set the current bank as selected item in the list
			this.byId("searchField").setValue(null);
			this.byId("searchField").fireLiveChange({newValue:""});

			var oList = this.byId("idChooseBankList");
			var oItems = oList.getItems();
			var oCurrentBankListItem = oItems.find(function (oItem) {
				return oItem.getProperty("description") === sBankNumber;
			});

			oList.removeSelections();
			if(typeof oCurrentBankListItem !== "undefined") {
				oList.setSelectedItem(oCurrentBankListItem);
			}
		},

		/**
		 * Event handler called when user searches a bank in the value help dialog.
		 * This function needs to set the filter with the query to perform the search operation.
		 * @public
		 */
		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [new Filter("BankCountry", sap.ui.model.FilterOperator.Contains, this._sSelectedCountry)];
			var sQuery = oEvent.getParameter("newValue");
			if (sQuery) {
				aFilters.push(new Filter("BankName", sap.ui.model.FilterOperator.Contains, sQuery));
			}
			this._filterList(aFilters);
		},
		
		_filterList: function(aFilters) {
			// update list binding
			var oList = this.byId("idChooseBankList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
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
			// add filter to only show banks from selected country
			var aFilters = [];
			this._sSelectedCountry = this._oModel.getProperty(this._sBindingPath + "/BankCountryKey");
			if (this._sSelectedCountry && this._sSelectedCountry.length > 0) {
				var filter = new Filter("BankCountry", sap.ui.model.FilterOperator.Contains, this._sSelectedCountry);
				aFilters.push(filter);
			}
			this._filterList(aFilters);
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