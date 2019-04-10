sap.ui.define([
	"sap/ui/base/EventProvider",
	"com/sap/workflow/ChangePaymentData/model/formatter",
	"com/sap/workflow/ChangePaymentData/model/CustomDateType",
	"com/sap/workflow/ChangePaymentData/utils/Validator",
	"com/sap/workflow/ChangePaymentData/controller/ChooseCountryDialogDelegate",
	"sap/m/MessageBox",
	"com/sap/workflow/ChangePaymentData/controller/ChooseBankDialogDelegate"
], function (EventProvider, formatter, CustomDateType, Validator, ChooseCountryDialogDelegate, MessageBox, ChooseBankDialogDelegate) {
	"use strict";

	return EventProvider.extend("com.sap.workflow.ChangePaymentData.controller.AddPaymentDataDialogDelegate", {
		_sFragmentName: "com.sap.workflow.ChangePaymentData.view.AddPaymentDataDialog",
		_oFragment: null,
		_sFragmentId: null,
		_oModel: null,
		_oCountryModel:null,
		_chooseCountryDialogDelegate: null,
		_validator: null,
		formatter: formatter,
		_oBankModel:null,
		_chooseBankDialogDelegate:null,
		types: {
			customDateType: new CustomDateType()
		},

		/**
		 * Called to create a new payment data and push it to the model.
		 * It also binds newly created entry to the fragment.
		 * @public
		 */
		createNewPaymentData : function () {
			// create a new object and bind it to the view

			var iBankID = this.getNextBankIdentification();
			var sTodayInEDMFormat = this.types.customDateType.parseValue(new Date());

			var oNewEntry = {
				BusinessPartner: this._oModel.getProperty("/BusinessPartner"),
				BankIdentification: iBankID.toString(),
				BankCountryKey: "",
				BankName: "",
				BankNumber: "",
				SWIFTCode: "",
				BankAccountHolderName: "",
				ValidityStartDate: sTodayInEDMFormat,
				ValidityEndDate: "/Date(253402300799000+0000)/",
				IBAN: "",
				BankAccount: "",
				Status: "ToBeCreated"
			};

			// add the new payment object to the model
			var oBankEntries = this._oModel.getProperty("/CurrentBankData/d/results/");
			var idxNewEntry = oBankEntries.push(oNewEntry);
			this._oModel.setProperty("/CurrentBankData/d/results/", oBankEntries);

			this.getFragment().bindElement({
				path: "/CurrentBankData/d/results/" + (idxNewEntry-1).toString()
			});
		},

		/**
		 * Called to get the next available 'id' for Bank.
		 * It tries all the numbers starting from 1 to 9999.
		 * Throws an error if all the slots are occupied.
		 * @public
		 */
		getNextBankIdentification : function (){
			var oData = this._oModel.getProperty("/CurrentBankData/d/results/");

			for (var bankIdCandidate = 1; bankIdCandidate <= 9999; ++bankIdCandidate) {
				var oFoundItem = oData.find(function (oItem) {
					return parseInt(oItem.BankIdentification) === bankIdCandidate;
				});
				// if not found, then the candidate can be id
				if(oFoundItem === undefined){
					return bankIdCandidate;
				}
			}

			throw new Error("There cannot be more than 9999 banks in one Business Partner object.");
		},

		/**
		 * Event handler called when save button is chosen.
		 * It triggers the validation on the entries. If validation succeed, the callback function is called.
		 * If validation fails, the function execution is stopped.
		 * Showing the error in the validation is handled automatically by message manager.
		 * @private
		 */
		onSave: function () {
			// simple validity check
			var isValid =  this._validator.isValid();

			if(!isValid){
				return;
			}

			this._fnOnAfterSave();

			this.close();
		},

		onFieldChange: function(){
			this._validator.setValidationRequired(true);
		},

		/**
		 * Event handler called when escape key is pressed.
		 * It calls the onCalcel event handler.
		 * @private
		 */
		onEscape: function (oPromise) {
			this.onCancel();
			oPromise.resolve();
		},

		/**
		 * Event handler called when country value help requested.
		 * This request happens whenever user clicks on the country in edit mode.
		 * It handles the dialog delegate and binds the current element.
		 * @public
		 */
		onCountryValueHelp: function () {
			if (!this._chooseCountryDialogDelegate) {
				this._chooseCountryDialogDelegate= new ChooseCountryDialogDelegate(
					this._oModel,
					this._oCountryModel);
				this.getFragment().addDependent(this._chooseCountryDialogDelegate.getFragment());
			}
			this._chooseCountryDialogDelegate.setBindingPath(this.getFragment().getBindingContext().getPath());
			this._chooseCountryDialogDelegate.open();
		},
		
		/**
		 * Event handler called when bank value help requested.
		 * This request happens whenever user clicks on the bank.
		 * This function needs to show the value help dialog for banks.
		 * @private
		 */
		onBankValueHelp: function () {
			var sCountryKey = this._oModel.getProperty(this.getFragment().getBindingContext().getPath() + "/BankCountryKey");
			if (!sCountryKey || sCountryKey === "") {
				MessageBox.warning("You need to select a country first!");
				return;
			}
			if (!this._chooseBankDialogDelegate) {
				this._chooseBankDialogDelegate = new ChooseBankDialogDelegate(
					this._oModel,
					this._oBankModel);
				this.getFragment().addDependent(this._chooseBankDialogDelegate.getFragment());
			}
			this._chooseBankDialogDelegate.setBindingPath(this.getFragment().getBindingContext().getPath());
			this._chooseBankDialogDelegate.open();
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
		constructor: function (oModel, oCountryModel, fnOnAfterSave, oBankModel) {
			sap.ui.base.EventProvider.prototype.constructor.apply(this, arguments);
			this._oModel = oModel;
			this._oCountryModel = oCountryModel;
			this._oBankModel = oBankModel;
			this._fnOnAfterSave = fnOnAfterSave;
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
		 * Called when the delegate is initialized.
		 * It register the view to the message manager.
		 * @private
		 */
		onInit: function () {
			sap.ui.getCore().getMessageManager().registerObject(this.getFragment(), true);
			if(!this._validator){
				this._validator = new Validator(this.getFragment(), true);
			}
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
		 * Event handler called when the dialog is closed.
		 * It is not used here, but rather kept for future implementation as a reference.
		 * @private
		 */
		onBeforeClose : function (oEvent){
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

			// set the escape handler to intervene the behaviour.
			this._oFragment.setEscapeHandler(this.onEscape.bind(this));

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
		},

		/**
		 * Event handler called when cancel button is chosen (and manually called in case of escape key pressed).
		 * It deletes the created entry and closes the dialog.
		 * @private
		 */
		onCancel: function () {
			var oBankEntries = this._oModel.getProperty("/CurrentBankData/d/results/");
			oBankEntries.pop();
			this._oModel.setProperty("/CurrentBankData/d/results/", oBankEntries);

			this.getFragment().close();
		}

	});
});