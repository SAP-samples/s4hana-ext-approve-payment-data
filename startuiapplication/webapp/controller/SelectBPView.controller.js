sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, Filter, MessageBox) {
	"use strict";

	return Controller.extend("StartUIApplication.StartUIApplication.controller.SelectBPView", {
		inputId: "",
		
		sSelectedId: "",
		
        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */	
        
        /**
         * Called when the controller is instantiated.
         * @public
         */
		onInit: function() {
			//Read information of logged in user and put them into the UserModel
			var userModel = new JSONModel("/services/userapi/currentUser");
			userModel.attachRequestCompleted(function(){
				this.aStartedBy = userModel.getData();
				this.setModel(userModel, "UserModel");
			}.bind(this));
		},
		
		/* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */
		
		/**
		 * Event Handler called when value help for Business Partner is clicked
		 * @public
		 * @param {Object} oEvent of the click
		 */
		handleValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();

			// create value help dialog
			var selDialogue = new sap.m.SelectDialog({
				confirm: this._handleValueHelpClose.bind(this),
				search: this._handleValueHelpSearch
			});
			selDialogue.bindAggregation("items", {
				path: "/YY1_BUPA_OVS",
				template: new sap.m.StandardListItem({
					title: "{BusinessPartnerFullName}",
					description: "{BusinessPartner}"
				})
			});
			var oModel = this.getModel("bpartners");
			selDialogue.setModel(oModel);
			selDialogue.open();

			// create a filter for the binding
			selDialogue.getBinding("items").filter([new Filter(
				"BusinessPartner",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			selDialogue.open(sInputValue);
		},

		/**
		 * Handle the press Event of the "Create Request" button
		 * @public
		 * @param {Object} evt the click event of the button
		 */
		onStartPress: function(evt) {
			var token = this._fetchToken();
			var aResult = this._checkWorkflowInstance();
			if (aResult.length > 0) {
				this.showErrorMessageBox(this.getI18n().getText("errorExistingInstance",aResult[0].startedBy));
			} else {
				this._startInstance(token);
			}
		},
		
		/**
		 * Shows error Message in a box
		 * @public
		 * @param {string} sMsg that should be shown in the message box
		 */
		showErrorMessageBox: function(sMsg) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.error(sMsg, {
				styleClass: bCompact ? "sapUiSizeCompact" : ""
			});
		},
		
		/* =========================================================== */
        /*		  internal methods                                     */
        /* =========================================================== */

		/**
		 * Handles Value help search
		 * @private
		 * @param {Object} evt that is triggered when search term was entered
		 */		
		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilters = new Filter([
				new Filter("BusinessPartner",
					sap.ui.model.FilterOperator.Contains, sValue
				),
				new Filter("BusinessPartnerFullName",
					sap.ui.model.FilterOperator.Contains, sValue)
			]);

			evt.getSource().getBinding("items").filter([oFilters]);
		},

		/**
		 * Handles the value help close
		 * @private
		 * @param {Object} evt that is triggered when close button 
		 *			on value help is pressed
		 */		
		_handleValueHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var oBusinessPartnerInput = this.getView().byId(this.inputId);
				oBusinessPartnerInput.setValue(oSelectedItem.getTitle());
				this.sSelectedId = oSelectedItem.getDescription();
			}
			evt.getSource().getBinding("items").filter([]);
		},

		/**
		 * Creates a new instance for the workflow
		 * @public
		 * @param {string} sToken the x-csrf token
		 */
		_startInstance: function(sToken) {
			//prepare Json for sending
			var sJsonData = JSON.stringify({
					definitionId: "businesspartnerworkflow",
					context: {
						"BusinessPartner": this.sSelectedId,
						"StartedBy": this.aStartedBy
					}
				});
			
			//Execute POST request	
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/workflow-instances",
				method: "POST",
				contentType: "application/json",
				// pass the updated context to the API
				data: sJsonData,
				headers: {
					// pass the xsrf token retrieved earlier
					"X-CSRF-Token": sToken
				},
				// Redirect to inbox on successful completion
				success: window.location.replace(this.getView().getModel("config").getResourceBundle().getText("fioriInboxUrl"))
			});
		},
		
		/**
		 * Gets all running workflow instances of a given Business Partner
		 * @private
		 * @returns {array} all running workflow instances
		 */
		_checkWorkflowInstance: function() {
			var aResult;
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/workflow-instances?status=RUNNING&businessKey=" + this.sSelectedId,
				method: "GET",
				async: false,
				success: function(result, xhr, data) {
					aResult = result;
				}
			});
			return aResult;
		},

		/**
		 * Gets the x-csrf token for authorization
		 * @private
		 * @returns {string} the x-csrf token
		 */
		_fetchToken: function() {
			var token;
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/xsrf-token",
				method: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function(result, xhr, data) {
					token = data.getResponseHeader("X-CSRF-Token");
				}
			});
			return token;
		},

		/**
		 * Convenience method for getting the model.
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
			return this.getView().getModel("i18n").getResourceBundle();
		}
		
	});
});