sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/sap/workflow/ChangePaymentData/model/formatter",
	"com/sap/workflow/ChangePaymentData/model/CustomDateType",
	"sap/m/MessageBox",
	"com/sap/workflow/ChangePaymentData/controller/AddPaymentDataDialogDelegate",
	"com/sap/workflow/ChangePaymentData/controller/ChooseCountryDialogDelegate",
	"com/sap/workflow/ChangePaymentData/utils/Validator",
	"com/sap/workflow/ChangePaymentData/controller/ChooseBankDialogDelegate"
], function (Controller, JSONModel, formatter, CustomDateType, MessageBox, AddPaymentDataDialogDelegate, ChooseCountryDialogDelegate, Validator, ChooseBankDialogDelegate) {
	"use strict";

	return Controller.extend("com.sap.workflow.ChangePaymentData.controller.changePaymentData", {
		types: {
			customDateType: new CustomDateType()
		},
		formatter: formatter,
		_chooseCountryDialogDelegate: null,
		_oPrevSelectedItemIdx: -1,
		_oValidator: null,
		_oOriginalContextData: [],
		_chooseBankDialogDelegate: null,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the controller is instantiated. It sets up the status of each entry
		 * and register the forms to message manager.
		 * @public
		 */
		onInit: function () {
			// Set all items Status field to Unchanged after data received.
			this.getModel().pSequentialImportCompleted.then(function () {
				this.getModel().getContext("/CurrentBankData/d/results/").getObject().forEach(function (oItem, idx) {
					oItem.Status = "Unchanged";
					this._oOriginalContextData.push(Object.assign({}, oItem));

					// need to initialize a map that stores 'is changed' information for the fields.
					var oLastPushedItem = this._oOriginalContextData[this._oOriginalContextData.length - 1];
					oLastPushedItem.isChanged = new Map();
					for(var oField in oLastPushedItem){
						if (oLastPushedItem.hasOwnProperty(oField)) {
							oLastPushedItem.isChanged.set(oField, false);
						}
					}

					// need to format the date for comparison purposes
					oLastPushedItem.ValidityStartDate = this.types.customDateType.formatValue(oLastPushedItem.ValidityStartDate);
				}.bind(this));
			}.bind(this));

			sap.ui.getCore().getMessageManager().registerObject(this.byId("paymentDataForms"), true);

			//create Validator for validation
			this._oValidator = new Validator(this.byId("paymentDataForms"));

			//prepare validation on Component
			this.getOwnerComponent().savePageController(this);
		},

		getValidator: function () {
			return this._oValidator;
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler called when user changes any entry in the forms, and sets the status accordingly.
		 * @private
		 */
		onFieldChange: function (oEvent) {
			// current binding context
			var oCtx = this.byId("paymentDataForms").getBindingContext();
			var sPath = oCtx.getPath();

			// change the status to changed if it is Unchanged
			if (["Unchanged", "ToBeChanged"].find(function(item ) { return item === oCtx.getObject().Status; } )) {
				var bChanged = this.compareWithOriginal(oEvent);
				this.getModel().setProperty(sPath + "/Status", bChanged ? "ToBeChanged" : "Unchanged");

				this._oValidator.setValidationRequired(bChanged);
			}
			// valdation is required when user changes the created payment data
			if (oCtx.getObject().Status === "ToBeCreated")
				this._oValidator.setValidationRequired(true);

			// if it was in the error state, we shall re-run the validation to be sure the value state is updated.
			if(oEvent.oSource.mProperties.valueState === "Error"){
				this._oValidator.isValid();
			}
		},

		compareWithOriginal: function (oEvent) {
			var ctxPath = oEvent.oSource.mBindingInfos.value.binding.oContext.sPath;
			var bndPath = oEvent.oSource.mBindingInfos.value.binding.sPath;

			var idx = parseInt(ctxPath.match(/\d+/)[0]);

			var bIsChanged = this._oOriginalContextData[idx][bndPath] !== oEvent.mParameters.newValue;
			this._oOriginalContextData[idx].isChanged.set(bndPath, bIsChanged);

			if (bIsChanged) {
				return true; // as the current field is already changed, we dont need to check the others.
			}
			else {
				for (var isChanged in this._oOriginalContextData[idx].isChanged.values()) {
					if (isChanged) {
						return true;
					}
				}
				return false;
			}
			/*return !this._oOriginalContextData.every( function (currentValue) {
				return !currentValue.isChanged;
			})*/
		},

		/**
		 * Event handler called when user selects an entry in the table.
		 * Handles the binding of the forms.
		 * @private
		 */
		onSelectionChange: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("listItem");
			if (!oSelectedItem) {
				this.byId("paymentDataForms").setVisible(false);
				return;
			}

			// if validation fails on the current selected item
			// we still get the selection change animation on newly selected row.
			// to revert that, we simply select the old list item again (if exists).
			if (this._oPrevSelectedItemIdx !== -1) {
				var oTable = this.byId("tableBanks");
				var bIsPrevRowDeleted = this.getModel().getProperty(
					oTable.getItems()[this._oPrevSelectedItemIdx].getBindingContextPath() + "/Status") === "ToBeDeleted";
				if (!bIsPrevRowDeleted &&
					!this._oValidator.isValid()) {
					MessageBox.warning(this.getI18n().getText("preventSelectionChangeDueToValidationFailedMessage"));

					oTable.setSelectedItem(oSelectedItem, false);
					oTable.setSelectedItem(oTable.getItems()[this._oPrevSelectedItemIdx], true);
					return;
				}
			}

			this._oPrevSelectedItemIdx = oSelectedItem.getBindingContextPath().match(/\d+/)[0];
			this.byId("paymentDataForms").setVisible(true);
			var oPaymentDetailsHBox = this.byId("paymentDataForms");
			oPaymentDetailsHBox.bindElement({
				path: oSelectedItem.getBindingContext().sPath
			});
		},

		/**
		 * Event handler called when country value help requested.
		 * This request happens whenever user clicks on the country.
		 * This function needs to show the value help dialog for country.
		 * @private
		 */
		onCountryValueHelp: function () {
			if (!this._chooseCountryDialogDelegate) {
				this._chooseCountryDialogDelegate = new ChooseCountryDialogDelegate(
					this.getModel(),
					this.getModel("countriesISOModelJSON"),
					function () {
						this.byId("countryInput").fireChange({"newValue" :
								this.getModel().getProperty(
									this.byId("paymentDataForms").getBindingContext().getPath() + "/BankCountryKey")});
					}.bind(this));
				this.getView().addDependent(this._chooseCountryDialogDelegate.getFragment());
			}
			this._chooseCountryDialogDelegate.setBindingPath(this.byId("paymentDataForms").getBindingContext().getPath());
			this._chooseCountryDialogDelegate.open();
		},
		
		/**
		 * Event handler called when bank value help requested.
		 * This request happens whenever user clicks on the bank.
		 * This function needs to show the value help dialog for banks.
		 * @private
		 */
		onBankValueHelp: function () {
			var sCountryKey = this.getModel().getProperty(this.byId("paymentDataForms").getBindingContext().getPath() + "/BankCountryKey");
			if (!sCountryKey) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"You need to select a country first!",
					{
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
				return;
			}
			if (!this._chooseBankDialogDelegate) {
				this._chooseBankDialogDelegate = new ChooseBankDialogDelegate(
					this.getModel(),
					this.getModel("bankModel"),
					function () {
						this.byId("bankInput").fireChange({"newValue" :
								this.getModel().getProperty(
									this.byId("paymentDataForms").getBindingContext().getPath() + "/BankNumber")});
					}.bind(this));
				this.getView().addDependent(this._chooseBankDialogDelegate.getFragment());
			}
			this._chooseBankDialogDelegate.setBindingPath(this.byId("paymentDataForms").getBindingContext().getPath());
			this._chooseBankDialogDelegate.open();
		},

		/**
		 * Event handler called when delete button is chosen.
		 * This function asks user whether she is sure and changes the status accordingly.
		 * @private
		 */
		onDelete: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var sPath = oEvent.getSource().getBindingContext().getPath();
			MessageBox.confirm(
				this.getI18n().getText("deleteThisEntry"),
				{
					actions: ["Delete", sap.m.MessageBox.Action.CLOSE],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (sAction) {
						if (sAction === "Delete") {
							// delete the item directly if it is newly created
							if (this.getModel().getProperty(sPath + "/Status") === "ToBeCreated") {
								var oBankEntries = this.getModel().getProperty("/CurrentBankData/d/results/");
								oBankEntries.pop();
								this.getModel().setProperty("/CurrentBankData/d/results/", oBankEntries);
								this.byId("paymentDataForms").setVisible(false);
								return;
							}
							// otherwise, revert changes and mark it as to be deleted
							this.getModel().updateBindings(true);
							this._oValidator.setValidationRequired(true);
							this._oValidator.isValid();
							this.getModel().setProperty(sPath + "/Status", "ToBeDeleted");
						}
					}.bind(this)
				}
			);
		},

		_revertChanges: function (sPath) {
			// get the index from sPath
			var idx = sPath.match(/\d+/)[0];
			// get the model, and replace the array item with the original one
			this.getModel().setProperty(sPath, this._oOriginalContextData[idx]);
			// do the dues?? for the unchanged
			// validator
			// triggering the val error stuff?
		},

		onRevertChanges: function (oEvent) {

		},

		/**
		 * Event handler called when create button is chosen.
		 * This function shows the add payment details dialog.
		 * It instantiates the dialog if it is not yet constructed.
		 * @private
		 */
		onCreate: function () {
			var oTable = this.byId("tableBanks");
			oTable.removeSelections(true);
			oTable.fireSelectionChange({selected: false});

			if (!this._oAddPaymentDataDialogDelegate) {
				this._oAddPaymentDataDialogDelegate = new AddPaymentDataDialogDelegate(this.getModel(), this.getModel("countriesISOModelJSON"), function () {
					// change the table selection to
					var oItems = oTable.getItems();
					var oLastItem = oItems[oItems.length - 1];
					oTable.setSelectedItem(oLastItem);
					oTable.fireSelectionChange({listItem: oLastItem, selected: true});
				}.bind(this), this.getModel("bankModel"));
				this.getView().addDependent(this._oAddPaymentDataDialogDelegate.getFragment());
			}
			this._oAddPaymentDataDialogDelegate.createNewPaymentData();
			this._oAddPaymentDataDialogDelegate.open();
		},

		/**
		 * Event handler called when create button is pressed.
		 * @public
		 * @param {object} oEvent click event of the link press
		 */
		handleLinkPress: function (oEvent) {
			//Link has to be split up, because of all spezial characters in it.
			var sLinkPart1 = this.getModel("config").getResourceBundle().getText("businessPartnerLinkPart1") + oEvent.getSource().getText();
			var sLink = sLinkPart1 + this.getModel("config").getResourceBundle().getText("businessPartnerLinkPart2");
			sap.m.URLHelper.redirect(sLink, true);
		},

		/* =========================================================== */
		/*		  internal methods                                     */
		/* =========================================================== */

		/**
		 * Convenience method for getting the model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		/**
		 * Convenience method for setting the model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 */
		setModel: function (oModel, sName) {
			this.getOwnerComponent().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the i18n ResourceModel.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} i18n ResourceBundle
		 */
		getI18n: function () {
			return this.getModel("i18n").getResourceBundle();
		}
	});
});