sap.ui.define([
	"sap/ui/core/UIComponent",
	"com/sap/workflow/approvechangerequest/approvePaymentDataCR/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Label",
	"sap/m/Text",
	"sap/m/TextArea"
], function(UIComponent, models, JSONModel, MessageBox, Button, Dialog, Label, Text, TextArea) {
	"use strict";

	return UIComponent.extend("com.sap.workflow.approvechangerequest.approvePaymentDataCR.Component", {

		metadata: {
			manifest: "json"
		},

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */
        
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create variables and store task relevant data
			var startupParameters = this.getComponentData().startupParameters;
			var taskModel = startupParameters.taskModel;
			var taskId = taskModel.getData().InstanceID;
			var taskData = taskModel.getData();
			var contextData;
			
			// read current context data from Workflow Rest API
			var contextModel = new JSONModel("/bpmworkflowruntime/rest/v1/task-instances/" + taskId + "/context");
			contextModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.setModel(contextModel);

			// after reading all context information is done
			contextModel.attachRequestCompleted(function() {
				// get task related data to be set in UI ObjectHeader
				contextData = contextModel.getData();
				contextData.task = {};
				contextData.task.Title = taskData.TaskTitle;
				contextData.task.Priority = taskData.Priority;
				contextData.task.Status = taskData.Status;

				// get date on which task was created
				contextData.task.CreatedOn = taskData.CreatedOn.toDateString();

				// get task description and add it to the UI model
				startupParameters.inboxAPI.getDescription("NA", taskData.InstanceID)
					.done(function(dataDescr) {
						contextData.task.Description = dataDescr.Description;
						contextModel.setData(contextData);
					})
					.fail(function(errorText) {
						jQuery.sap.require("MessageBox");
						MessageBox.error(errorText, {
							title: this.getI18n().getText("error")
						});
					});
			});

			// Implementation for the approve action
			var oPositiveAction = {
				sBtnTxt: this.getI18n().getText("approve"),
				onBtnPressed: function() {
					this.getModel().refresh(true);
					// Call a local method to perform further action
					this._triggerComplete(this.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
						true);
				}.bind(this)
			};

			// add 'Approve' action to the task
			startupParameters.inboxAPI.addAction({
					action: oPositiveAction.sBtnTxt,
					label: oPositiveAction.sBtnTxt,
					type: "Accept"
				},
				oPositiveAction.onBtnPressed);

			// implemenation for the Reject action
			var oNegativeAction = {
				sBtnTxt: this.getI18n().getText("reject"),
				onBtnPressed: function() {
					this.onRejectDialog();
				}.bind(this)
			};

			// add Reject action to the task
			startupParameters.inboxAPI.addAction({
					action: oNegativeAction.sBtnTxt,
					label: oNegativeAction.sBtnTxt,
					type: "Reject"
				},
				oNegativeAction.onBtnPressed);
		},

		/* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

		/**
		 * Event handler that shows dialog where the User can enter a rejection reason
		 * @public
		 */
		onRejectDialog: function() {
			var dialog = new Dialog({
				title: this.getI18n().getText("reject"),
				type: "Message",
				content: [
					new Label({
						text: this.getI18n().getText("enterRejectionReason"),
						labelFor: "rejectDialogTextarea"
					}),
					new TextArea("rejectDialogTextarea", {
						width: "100%",
						placeholder: this.getI18n().getText("addReason")
					})
				],
				beginButton: new Button({
					text: this.getI18n().getText("reject"),
					press: function() {
						this.sRejectionReason = sap.ui.getCore().byId("rejectDialogTextarea").getValue();
						this._triggerComplete(this.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
							false);
						dialog.close();
					}.bind(this )
				}),
				endButton: new Button({
					text: this.getI18n().getText("cancel"),
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		/* =========================================================== */
        /*		  internal methods                                     */
        /* =========================================================== */
        
		/**
		 * This method is called when the confirm button is click by the end user
		 * @private
		 * @param {string} taskId of the current task
		 * @param {boolean} approvalStatus if the change request was approved
		 */
		_triggerComplete: function(taskId, approvalStatus) {
			// Call workflow API to get the xsrf token
			this.getModel();
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/xsrf-token",
				method: "GET",
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function(result, xhr, data) {
					// After retrieving the xsrf token successfully
					var token = data.getResponseHeader("X-CSRF-Token");
					// form the context that will be updated - approval status and the equipment list
					var dataText = "{ \"status\":\"COMPLETED\",\"context\": {\"PaymentDataApproved\": \"" + approvalStatus + "\", \"RejectionReason\":\""
					 + this.sRejectionReason + "\"} }";
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
		 * Requests Inbox to refresh the control once the task is completed
		 * @private
		 */
		_refreshTask: function() {
			var taskId = this.getComponentData().startupParameters.taskModel.getData().InstanceID;
			this.getComponentData().startupParameters.inboxAPI.updateTask("NA", taskId);
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