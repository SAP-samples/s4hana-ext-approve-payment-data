sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/workflow/ChangePaymentData/model/models",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"com/sap/workflow/ChangePaymentData/utils/Validator"
], function (UIComponent, Device, models, MessageBox, JSONModel, Validator) {
	"use strict";

	return UIComponent.extend("com.sap.workflow.ChangePaymentData.Component", {

		metadata: {
			manifest: "json"
		},
		_oChangePaymentDataPage: null,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */
        
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			var contextModel = new JSONModel();
			this.setModel(contextModel);
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var startupParameters = this.getComponentData().startupParameters;
			var taskModel = startupParameters.taskModel;
			var taskId = taskModel.getData().InstanceID;
			var taskData = taskModel.getData();

			//Delete the footer to delete unused buttons
			//startupParameters.inboxAPI.setShowFooter(false);

			// to show busy indicator, attach to the request sent and completed events
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.setModel(oViewModel, "viewModel");
			contextModel.attachRequestSent(function (/*oEvent*/) {
				oViewModel.setProperty("/busy", true);
			}, this);
			contextModel.attachRequestCompleted(function (/*oEvent*/) {
				oViewModel.setProperty("/busy", false);
			}, this);

			contextModel.loadData("/bpmworkflowruntime/rest/v1/task-instances/" + taskId + "/context");

			contextModel.attachRequestCompleted(function () {
				var contextData = contextModel.getData();
				// Get task related data to be set in UI ObjectHeader
				contextData.task = {};
				contextData.task.Title = taskData.TaskTitle;
				contextData.task.Priority = taskData.Priority;
				contextData.task.Status = taskData.Status;

				// Get date on which task was created
				contextData.task.CreatedOn = taskData.CreatedOn.toDateString();

				// Get task description and add it to the UI model
				startupParameters.inboxAPI.getDescription("NA", taskData.InstanceID)
					.done(function (dataDescr) {
						contextData.task.Description = dataDescr.Description;
						contextModel.setData(contextData);
					})
					.fail(function (errorText) {
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.error(errorText, {
							title: this.getI18n().getText("error")
						});
					});
				this.setModel(contextModel);
			}.bind(this));

			// Implementation for the sendRequest action
			var oPositiveAction = {
				sBtnTxt: this.getI18n().getText("sendRequest"),
				onBtnPressed: function () {
					// Call a local method to perform further action
					this._triggerComplete(this.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID);
				}.bind(this)
			};

			// Add 'Send Request' action to the task
			startupParameters.inboxAPI.addAction({
					action: oPositiveAction.sBtnTxt,
					label: oPositiveAction.sBtnTxt,
					type: "Accept"
				},
				oPositiveAction.onBtnPressed);

			// Implementation for the Cancel action
			var oCancelAction = {
				sBtnTxt: this.getI18n().getText("cancel"),
				onBtnPressed: function () {
					// Call a local method to perform further action
					this._triggerCancel(this.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID);
				}.bind(this)
			};

			// Add 'Cancel' action to the task
			startupParameters.inboxAPI.addAction({
					action: oCancelAction.sBtnTxt,
					label: oCancelAction.sBtnTxt,
					type: "Reject"
				},
				oCancelAction.onBtnPressed);
		},
		
		/**
		 * This is a workaround method, which is needed to prevent a direct call from the Component to the view.
		 * On init of the ChangePaymentData View this method is called and the id is save for later use.
		 * @public
		 * @param {sap.ui.core.mvc.Controller} oPageController id of the page
		 * 
		 */ 
		savePageController: function(oPageController) {
			this._oChangePaymentDataPage = oPageController;
		},
		
		/* =========================================================== */
        /*		  internal methods                                     */
        /* =========================================================== */

		/**
		 * This method is called when the send request button is click by the end user
		 * @private
		 * @param {string} taskId of the current task
		 */
		_triggerComplete: function (taskId) {
			// if(!this._oChangePaymentDataPage.getValidator().validate(this._oChangePaymentDataPage)) {
			if(!this._oChangePaymentDataPage.getValidator().isValid()) {
				MessageBox.warning(this.getI18n().getText("validationFailedMessage"));
				return;
			}

			//get Data from inputs
			var oChangeRequestData = this._prepareDataForRequest();
			if (oChangeRequestData.length === 0) {
				MessageBox.warning(this.getI18n().getText("noChangesMade"));
				return;
			}

			// Call workflow API to get the xsrf token
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/xsrf-token",
				method: "GET",
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function (result, xhr, data) {
					// After retrieving the xsrf token successfully
					var token = data.getResponseHeader("X-CSRF-Token");
					// form the context that will be updated - approval status and the equipment list
					var dataText = "{ \"status\":\"COMPLETED\",\"context\": {\"ChangedBankingData\": " + JSON.stringify(oChangeRequestData) + " } }";
					// Call workflow API to complete the task
					$.ajax({
						url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
						method: "PATCH",
						contentType: "application/json",
						// pass the updated context to the API
						data: dataText,
						headers: {
							// pass the xsrf token retrieved earlier
							"X-CSRF-Token": token
						},
						// refreshTask needs to be called on successful completion
						success: this._refreshTask.bind(this)
					});
				}.bind(this)
			});
		},

		/**
		 * This method is called when the cancel button is click by the end user
		 * @private
		 * @param {string} taskId of the current task
		 */
		_triggerCancel: function (taskId) {
		
			//get Data from inputs
			var oChangeRequestData = this._prepareDataForRequest();
			if (!(oChangeRequestData.length === 0)) {
				MessageBox.warning(this.getI18n().getText("unsavedChangesTerminateWorkflow"));
				return;
			}
			
			//Get workflow servicec ID
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
				method: "GET",
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function (result, xhr, data) {
					// Get workflow instance ID
					var sWorkflowID = result.workflowInstanceId;
					var token = data.getResponseHeader("X-CSRF-Token");
	
					//prepare JSON for task update
					var dataText = "{ \"status\":\"COMPLETED\",\"context\": { } }";
	
					// Call workflow API to complete the task
					$.ajax({
						url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
						method: "PATCH",
						contentType: "application/json",
						// pass the updated context to the API
						data: dataText,
						headers: {
							// pass the xsrf token retrieved earlier
							"X-CSRF-Token": token
						},
						// Call workflow API to cancel workflow
						success: function () {
							var sPatchRequest = "{\"status\": \"CANCELED\"}";
							$.ajax({
								url: "/bpmworkflowruntime/rest/v1/workflow-instances/" + sWorkflowID,
								method: "PATCH",
								contentType: "application/json",
								// pass the updated context to the API
								data: sPatchRequest,
								headers: {
									// pass the xsrf token retrieved earlier
									"X-CSRF-Token": token
								}
							});
							this._refreshTask();
						}.bind(this)
					});
				}.bind(this)
			});
		},

		/**
		 * Requests Inbox to refresh the control once the task is completed
		 * @private
		 */
		_refreshTask: function () {
			var taskId = this.getComponentData().startupParameters.taskModel.getData().InstanceID;
			this.getComponentData().startupParameters.inboxAPI.updateTask("NA", taskId);
		},

		/**
		 * Gets all changed entries and put them into an array to return them
		 * @private
		 * @returns {object} oChangeRequest all changed entries as an array
		 */
		_prepareDataForRequest: function () {
			// go through the results, and accumulate the ones with the status !Unchanged
			var oChangeRequest = [];
			var oResults = this.getModel().getProperty("/CurrentBankData/d/results/");
			oResults.forEach(function (oItem) {
				if (oItem.Status !== "Unchanged") {
					oChangeRequest.push(oItem);
				}
			});
			return oChangeRequest;
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