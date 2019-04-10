sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/workflow/approvechangerequest/approvePaymentDataCR/model/CustomDateType",
	"com/sap/workflow/approvechangerequest/approvePaymentDataCR/model/formatter"
], function(Controller, CustomDateType, formatter) {
	"use strict";

	return Controller.extend("com.sap.workflow.approvechangerequest.approvePaymentDataCR.controller.approveChangeRequest", {
		
		types: {
			customDateType: new CustomDateType()
		},
		
		formatter: formatter,
		
		/* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

		/**
		 * The controller is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		onInit: function() {
			this._oModel = this.getModel();
		},

		/* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */
        
    	/**
		 * Event handler for the link to the Business Partner Entry in the S/4 HANA System
		 * @public
		 * @param {Object} oEvent of the click
		 */
		handleLinkPress: function(oEvent){
			//Link has to be split up, because of all spezial characters in it.
			var sLinkPart1 = this.getModel("config").getResourceBundle().getText("businessPartnerLinkPart1") + oEvent.getSource().getText();
			var sLink = sLinkPart1 + this.getModel("config").getResourceBundle().getText("businessPartnerLinkPart2");
			sap.m.URLHelper.redirect(sLink, true);
		},
		
		/**
		 * Event handler for the on Selection Change Event of the table
		 * @public
		 * @param {Object} oEvent of the click
		 */
		onSelectionChange: function(oEvent) {
			this._resetFragment();
			var oSelectedItem = oEvent.getParameter("listItem");
			var sItemPath = oSelectedItem.getBindingContext();
			var sStatus = sItemPath.getObject().Status;
			switch (sStatus) {
				case "ToBeCreated":
					this._createCreatedForm(oSelectedItem);
					break;
				case "ToBeDeleted":
					this._createDeletedForm(oSelectedItem);
					break;
				default:
					this._createChangedForm(oSelectedItem, sItemPath);
			}
		},


		/* =========================================================== */
        /*		  internal methods                                     */
        /* =========================================================== */
        
    	/**
		 * Internal method for creating the form that shows a changed entry
		 * @private
		 * @param {Object} oSelectedItem the currently selected item
		 * @param {string} sItemPath path of the selected item in the data model
		 */
		_createChangedForm: function(oSelectedItem, sItemPath) {
			var oLeftForm = this.oFragment.getItems()[0];
			var oRightForm = this.oFragment.getItems()[1];
			oRightForm.bindElement({
				path: oSelectedItem.getBindingContext().sPath
			});
			oRightForm.getTitle().setText(this.getI18n().getText("changedPaymentData"));
			oRightForm.setVisible(true);
			
			oLeftForm.setVisible(true);
			oLeftForm.getTitle().setText(this.getI18n().getText("currentPaymentData"));
			var aAllCurrentBankInfos = this.getModel().getData().CurrentBankData.d.results;

			for (var i = 0; i < aAllCurrentBankInfos.length; i++) {
				if (aAllCurrentBankInfos[i].BankIdentification === sItemPath.getObject().BankIdentification) {
					oLeftForm.bindElement({
						path: "/CurrentBankData/d/results/" + i
					});
				}
			}
			
			var aLeftFormElements = oLeftForm.getFormContainers()[0].getFormElements();
			var aRightFormElements = oRightForm.getFormContainers()[0].getFormElements();
			
			for (var j = 0; j < aLeftFormElements.length; j++) {
				if(!(aLeftFormElements[j].getFields()[0].getText() === aRightFormElements[j].getFields()[0].getText())) {
					var oLabel = aRightFormElements[j].getLabel();
					oLabel.setDesign("Bold");
					oLabel.setText(oLabel.getText() + " (Changed)");
					oLabel.setRequired(true);
				}
			}
		},

    	/**
		 * Internal method for creating the form that shows a deleted entry
		 * @private
		 * @param {Object} oSelectedItem the currently selected item
		 */
		_createDeletedForm: function(oSelectedItem) {
			var oLeftForm = this.oFragment.getItems()[0];
			var oRightForm = this.oFragment.getItems()[1];
			
			oRightForm.setVisible(false);
			oLeftForm.setVisible(true);
			oLeftForm.bindElement({
				path: oSelectedItem.getBindingContext().sPath
			});
			oLeftForm.getTitle().setText(this.getI18n().getText("deletedPaymentData"));
		},

    	/**
		 * Internal method for creating the form that shows a created entry
		 * @private
		 * @param {Object} oSelectedItem the currently selected item
		 */
		_createCreatedForm: function(oSelectedItem) {
			var oLeftForm = this.oFragment.getItems()[0];
			var oRightForm = this.oFragment.getItems()[1];
			
			oRightForm.setVisible(false);
			oLeftForm.setVisible(true);
			oLeftForm.bindElement({
				path: oSelectedItem.getBindingContext().sPath
			});
			oLeftForm.getTitle().setText(this.getI18n().getText("createdPaymentData"));
		},
		
		/**
		 * Resets the fragment that is used as a template for the generated forms
		 * @private
		 */
		_resetFragment: function() {
			if(this.oFragment){
				this.oFragment.destroy();
			}
			this.oFragment = sap.ui.xmlfragment("fragmentId","com.sap.workflow.approvechangerequest.approvePaymentDataCR.view.Form", this);
			this.getView().byId("pageId").addContent(this.oFragment);
		},

		/**
		 * Convenience method for getting the model by name.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function(sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		/**
		 * Convenience method for setting the model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 */
		setModel: function(oModel, sName) {
			this.getOwnerComponent().setModel(oModel, sName);
		},
		
		/**
		 * Convenience method for getting the i18n ResourceModel.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} i18n ResourceBundle
		 */
		getI18n: function() {
			return this.getModel("i18n").getResourceBundle();
		}

	});
});