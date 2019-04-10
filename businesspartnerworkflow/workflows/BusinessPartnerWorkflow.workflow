{
	"contents": {
		"6fb02c53-1029-4e1d-b0e7-a5f250413e7f": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "businesspartnerworkflow",
			"subject": "BusinessPartnerWorkflow",
			"businessKey": "${context.BusinessPartner}",
			"name": "BusinessPartnerWorkflow",
			"lastIds": "f05b1e62-4db2-4052-9b65-ee721dfb7184",
			"events": {
				"3e83dbc7-7f13-4e51-b914-b018441b0818": {
					"name": "StartEvent"
				},
				"100217fe-6c47-429a-a8a6-951a20a85fb1": {
					"name": "EndEvent"
				},
				"a888e56e-8996-4432-be6f-08851fc5597d": {
					"name": "BoundaryTimerEvent1"
				}
			},
			"activities": {
				"dadf4a44-6474-4755-87a7-fc18819dc2b0": {
					"name": "Get Business Partner Data"
				},
				"08b926cc-de26-47f6-b850-7a7b3b3daa56": {
					"name": "Approve Payment Data Change"
				},
				"3f06b037-b9a1-4766-b6cb-7a5163d69ee3": {
					"name": "Split"
				},
				"6b621f2a-a47d-463c-8b59-329ae3c57f91": {
					"name": "Merge"
				},
				"8148593d-e374-4fee-ba03-f7cc5f7b32bc": {
					"name": "Update Bank Data on Business Partner"
				},
				"deab2278-90ec-4666-9977-70187a69ed81": {
					"name": "Get all Current Banking Information"
				},
				"a6fbb0ad-8c70-4f96-86a5-803bb47219a4": {
					"name": "Change Banking Data"
				},
				"9231260e-ab9e-4be9-9c6c-27be8b122559": {
					"name": "Prepare Patch for Change"
				},
				"b38789c6-eab8-41e4-86e0-eaae0b8fd95e": {
					"name": "Split"
				},
				"f4591eb5-c6d2-4d24-948b-8efa8b5342d3": {
					"name": "Merge"
				},
				"9787ec18-b278-43c0-84fd-af913579f94b": {
					"name": "Split"
				},
				"3d82a1ea-fe26-4fdb-85de-b14c4133a261": {
					"name": "Prepare Post for Create"
				},
				"0dc12446-5d11-490b-b9db-db417b741900": {
					"name": "Split"
				},
				"a545f88c-df4d-42a8-98c3-4f339106e67c": {
					"name": "Create Bank Data on Business Partner"
				},
				"5ffcce5e-a1ad-45bf-b2ee-fbfe0e4fc2f9": {
					"name": "Merge"
				},
				"386d028e-f8c6-4639-8804-471c18aebe0a": {
					"name": "Merge"
				},
				"28ebbc6c-9a73-41c6-bfc9-a2623d4768c6": {
					"name": "Prepare Delete"
				},
				"09701a38-e680-4fc8-8939-5fdeef19dd2a": {
					"name": "Split"
				},
				"81b92f7a-3106-4c02-b3d5-3475894abc93": {
					"name": "Delete Bank Data in Business Partner"
				},
				"2a9b018f-4bff-4d0a-a82c-c8388431e2d4": {
					"name": "Merge"
				},
				"e18e3470-7c25-4e33-bca4-0076d0e77052": {
					"name": "Get All Approvers"
				},
				"ad4a1134-a92d-4f05-a260-e0e1a8fa8ff6": {
					"name": "Extract all Approvers"
				}
			},
			"sequenceFlows": {
				"0e3e8cd8-ed15-43a8-9dc1-5484c4bc2799": {
					"name": "SequenceFlow3"
				},
				"43ec4905-9c9c-44dd-8c63-0ed28d13863a": {
					"name": "Approved"
				},
				"e0d66b73-d723-4327-bc2c-500be9a378f4": {
					"name": "Rejected"
				},
				"f8859448-7a3d-4e46-99be-915afa7dafe4": {
					"name": "SequenceFlow14"
				},
				"0ca50fee-cf26-4541-821c-3299309adf33": {
					"name": "SequenceFlow22"
				},
				"90f3a1b4-c14e-4336-9a83-8581f3fbd050": {
					"name": "SequenceFlow28"
				},
				"68c31478-a079-4632-b095-93acf2c96f6f": {
					"name": "SequenceFlow31"
				},
				"012a5d03-a1a3-4b77-915b-553bb7fdcb7c": {
					"name": "SequenceFlow46"
				},
				"e6450bd4-b175-438b-b4d9-4baa1c0f70b0": {
					"name": "New Change"
				},
				"2d3400b0-d4bc-4796-bfff-24aaa4bba150": {
					"name": "No Change"
				},
				"e6d26d41-d690-440c-8d3a-bcc538c32efe": {
					"name": "SequenceFlow51"
				},
				"3b7d60d1-f793-45a5-8c3c-d89e91526078": {
					"name": "SequenceFlow53"
				},
				"23eba0af-9fe2-42d2-9a35-242782d3c798": {
					"name": "SequenceFlow55"
				},
				"efe5128c-8132-4f72-92fc-01888aba362c": {
					"name": "SequenceFlow56"
				},
				"ef166de3-fe39-4dc4-acea-09780c04900d": {
					"name": "New Create"
				},
				"2461797a-492b-43db-833c-2a219cd1cf50": {
					"name": "No Create"
				},
				"6e475a70-a956-44b6-b649-f47405856d9b": {
					"name": "SequenceFlow61"
				},
				"42fb1507-b187-43f3-aa40-efda458adb22": {
					"name": "SequenceFlow62"
				},
				"b7538dc3-4d69-4ef9-816c-27260b59e09e": {
					"name": "SequenceFlow63"
				},
				"777deb00-3e69-43ee-85d1-dfbe9e645873": {
					"name": "SequenceFlow64"
				},
				"c1b03b3f-2c3d-4f8f-9292-96c5dec86f19": {
					"name": "SequenceFlow65"
				},
				"9859ae3b-686e-43e8-aa2b-461afc6b0bb9": {
					"name": "SequenceFlow66"
				},
				"b35ca506-e6b5-49d2-988c-3ec48e7bbded": {
					"name": "No Delete"
				},
				"5071d19a-c234-4ff3-8f88-50f51e7c465a": {
					"name": "SequenceFlow68"
				},
				"a69479e5-41bd-4658-9484-d2730e2df0d2": {
					"name": "SequenceFlow70"
				},
				"37ceff40-df86-4a01-af6d-57045f1d071e": {
					"name": "New Delete"
				},
				"76698d72-5c45-496b-906b-ae06353d9671": {
					"name": "SequenceFlow72"
				},
				"8864c43a-ba92-4301-ae5b-26f9e6af1e89": {
					"name": "SequenceFlow74"
				},
				"b3c7ed91-4ca6-44ae-9ff5-6ab270ea35b1": {
					"name": "SequenceFlow75"
				},
				"f8234ce4-3d01-464b-a30f-a5eabcdd9045": {
					"name": "SequenceFlow76"
				}
			},
			"diagrams": {
				"2881a123-b74f-4877-bce1-ec1f24205322": {}
			}
		},
		"3e83dbc7-7f13-4e51-b914-b018441b0818": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent2",
			"name": "StartEvent"
		},
		"100217fe-6c47-429a-a8a6-951a20a85fb1": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent2",
			"name": "EndEvent",
			"eventDefinitions": {
				"6e3abb4d-e253-408b-8b41-48bf049fbed0": {}
			}
		},
		"a888e56e-8996-4432-be6f-08851fc5597d": {
			"classDefinition": "com.sap.bpm.wfs.BoundaryEvent",
			"isCanceling": true,
			"id": "boundarytimerevent1",
			"name": "BoundaryTimerEvent1",
			"attachedToRef": "a6fbb0ad-8c70-4f96-86a5-803bb47219a4",
			"eventDefinitions": {
				"bc1e5a14-2ac5-49e1-b8f6-812c9578cd7d": {}
			}
		},
		"dadf4a44-6474-4755-87a7-fc18819dc2b0": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "ChangePaymentDataWorkflow2S4HANA",
			"path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${context.BusinessPartner}')?$select=BusinessPartner,BusinessPartnerFullName",
			"httpMethod": "GET",
			"responseVariable": "${context.bupaData}",
			"id": "servicetask2",
			"name": "Get Business Partner Data"
		},
		"08b926cc-de26-47f6-b850-7a7b3b3daa56": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Payment Data Change Request for ${context.bupaData.d.BusinessPartnerFullName}",
			"description": "Started by ${context.StartedBy.displayName}",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://html5apps/approvepaymentdatacr/com.sap.workflow.approvechangerequest.approvePaymentDataCR",
			"recipientUsers": "${context.Approvers}",
			"id": "usertask1",
			"name": "Approve Payment Data Change"
		},
		"3f06b037-b9a1-4766-b6cb-7a5163d69ee3": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway1",
			"name": "Split",
			"default": "e0d66b73-d723-4327-bc2c-500be9a378f4"
		},
		"6b621f2a-a47d-463c-8b59-329ae3c57f91": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway2",
			"name": "Merge"
		},
		"8148593d-e374-4fee-ba03-f7cc5f7b32bc": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "ChangePaymentDataWorkflow2S4HANA",
			"path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerBank(BusinessPartner='${context.PatchChangedData.BusinessPartner}',BankIdentification='${context.PatchChangedData.BankIdentification}')",
			"httpMethod": "PATCH",
			"xsrfPath": "/sap/opu/odata/sap/API_BUSINESS_PARTNER",
			"requestVariable": "${context.PatchChangedData}",
			"id": "servicetask7",
			"name": "Update Bank Data on Business Partner"
		},
		"deab2278-90ec-4666-9977-70187a69ed81": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "ChangePaymentDataWorkflow2S4HANA",
			"path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner(BusinessPartner='${context.BusinessPartner}')/to_BusinessPartnerBank",
			"httpMethod": "GET",
			"responseVariable": "${context.CurrentBankData}",
			"id": "servicetask10",
			"name": "Get all Current Banking Information",
			"apiReference": "f8809ef9-e820-4d1f-91d1-42948f7bdcd7"
		},
		"a6fbb0ad-8c70-4f96-86a5-803bb47219a4": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "New Change Payment Data Request",
			"description": "Started by ${context.StartedBy.displayName}",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://html5apps/changepaymentdata/com.sap.workflow.ChangePaymentData",
			"recipientUsers": "${context.StartedBy.name}",
			"id": "usertask2",
			"name": "Change Banking Data"
		},
		"9231260e-ab9e-4be9-9c6c-27be8b122559": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/BusinessPartnerWorkflow/PreparePatchForChange.js",
			"id": "scripttask7",
			"name": "Prepare Patch for Change"
		},
		"b38789c6-eab8-41e4-86e0-eaae0b8fd95e": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway3",
			"name": "Split",
			"default": "2d3400b0-d4bc-4796-bfff-24aaa4bba150"
		},
		"f4591eb5-c6d2-4d24-948b-8efa8b5342d3": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway4",
			"name": "Merge"
		},
		"9787ec18-b278-43c0-84fd-af913579f94b": {
			"classDefinition": "com.sap.bpm.wfs.ParallelGateway",
			"id": "parallelgateway3",
			"name": "Split"
		},
		"3d82a1ea-fe26-4fdb-85de-b14c4133a261": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/BusinessPartnerWorkflow/PreparePostForCreate.js",
			"id": "scripttask8",
			"name": "Prepare Post for Create"
		},
		"0dc12446-5d11-490b-b9db-db417b741900": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway5",
			"name": "Split",
			"default": "2461797a-492b-43db-833c-2a219cd1cf50"
		},
		"a545f88c-df4d-42a8-98c3-4f339106e67c": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "ChangePaymentDataWorkflow2S4HANA",
			"path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerBank",
			"httpMethod": "POST",
			"xsrfPath": "/sap/opu/odata/sap/API_BUSINESS_PARTNER",
			"requestVariable": "${context.PostRequestData}",
			"id": "servicetask13",
			"name": "Create Bank Data on Business Partner"
		},
		"5ffcce5e-a1ad-45bf-b2ee-fbfe0e4fc2f9": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway6",
			"name": "Merge"
		},
		"386d028e-f8c6-4639-8804-471c18aebe0a": {
			"classDefinition": "com.sap.bpm.wfs.ParallelGateway",
			"id": "parallelgateway4",
			"name": "Merge"
		},
		"28ebbc6c-9a73-41c6-bfc9-a2623d4768c6": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/BusinessPartnerWorkflow/PrepareDataForDelete.js",
			"id": "scripttask9",
			"name": "Prepare Delete"
		},
		"09701a38-e680-4fc8-8939-5fdeef19dd2a": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway7",
			"name": "Split",
			"default": "b35ca506-e6b5-49d2-988c-3ec48e7bbded"
		},
		"81b92f7a-3106-4c02-b3d5-3475894abc93": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "ChangePaymentDataWorkflow2S4HANA",
			"path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerBank(BusinessPartner='${context.DeleteRequestData.BusinessPartner}',BankIdentification='${context.DeleteRequestData.BankIdentification}')",
			"httpMethod": "DELETE",
			"xsrfPath": "/sap/opu/odata/sap/API_BUSINESS_PARTNER",
			"id": "servicetask14",
			"name": "Delete Bank Data in Business Partner"
		},
		"2a9b018f-4bff-4d0a-a82c-c8388431e2d4": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway8",
			"name": "Merge"
		},
		"e18e3470-7c25-4e33-bca4-0076d0e77052": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "ChangePaymentDataWorkflow2S4HANA",
			"path": "/sap/opu/odata/sap/YY1_MANAGEWORKFLOWAPPROVER_CDS/YY1_MANAGEWORKFLOWAPPROVER",
			"httpMethod": "GET",
			"responseVariable": "${context.Approvers}",
			"id": "servicetask15",
			"name": "Get All Approvers"
		},
		"ad4a1134-a92d-4f05-a260-e0e1a8fa8ff6": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/BusinessPartnerWorkflow/ExtractAllApprovers.js",
			"id": "scripttask10",
			"name": "Extract all Approvers"
		},
		"0e3e8cd8-ed15-43a8-9dc1-5484c4bc2799": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow3",
			"name": "SequenceFlow3",
			"sourceRef": "3e83dbc7-7f13-4e51-b914-b018441b0818",
			"targetRef": "dadf4a44-6474-4755-87a7-fc18819dc2b0"
		},
		"43ec4905-9c9c-44dd-8c63-0ed28d13863a": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.PaymentDataApproved==\"true\"}",
			"id": "sequenceflow10",
			"name": "Approved",
			"sourceRef": "3f06b037-b9a1-4766-b6cb-7a5163d69ee3",
			"targetRef": "9787ec18-b278-43c0-84fd-af913579f94b"
		},
		"e0d66b73-d723-4327-bc2c-500be9a378f4": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow11",
			"name": "Rejected",
			"sourceRef": "3f06b037-b9a1-4766-b6cb-7a5163d69ee3",
			"targetRef": "6b621f2a-a47d-463c-8b59-329ae3c57f91"
		},
		"f8859448-7a3d-4e46-99be-915afa7dafe4": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow14",
			"name": "SequenceFlow14",
			"sourceRef": "6b621f2a-a47d-463c-8b59-329ae3c57f91",
			"targetRef": "100217fe-6c47-429a-a8a6-951a20a85fb1"
		},
		"0ca50fee-cf26-4541-821c-3299309adf33": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow22",
			"name": "SequenceFlow22",
			"sourceRef": "dadf4a44-6474-4755-87a7-fc18819dc2b0",
			"targetRef": "deab2278-90ec-4666-9977-70187a69ed81"
		},
		"90f3a1b4-c14e-4336-9a83-8581f3fbd050": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow28",
			"name": "SequenceFlow28",
			"sourceRef": "08b926cc-de26-47f6-b850-7a7b3b3daa56",
			"targetRef": "3f06b037-b9a1-4766-b6cb-7a5163d69ee3"
		},
		"68c31478-a079-4632-b095-93acf2c96f6f": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow31",
			"name": "SequenceFlow31",
			"sourceRef": "deab2278-90ec-4666-9977-70187a69ed81",
			"targetRef": "a6fbb0ad-8c70-4f96-86a5-803bb47219a4"
		},
		"012a5d03-a1a3-4b77-915b-553bb7fdcb7c": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow46",
			"name": "SequenceFlow46",
			"sourceRef": "9231260e-ab9e-4be9-9c6c-27be8b122559",
			"targetRef": "b38789c6-eab8-41e4-86e0-eaae0b8fd95e"
		},
		"e6450bd4-b175-438b-b4d9-4baa1c0f70b0": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.PatchNextEntry==\"true\"}",
			"id": "sequenceflow47",
			"name": "New Change",
			"sourceRef": "b38789c6-eab8-41e4-86e0-eaae0b8fd95e",
			"targetRef": "8148593d-e374-4fee-ba03-f7cc5f7b32bc"
		},
		"2d3400b0-d4bc-4796-bfff-24aaa4bba150": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow49",
			"name": "No Change",
			"sourceRef": "b38789c6-eab8-41e4-86e0-eaae0b8fd95e",
			"targetRef": "f4591eb5-c6d2-4d24-948b-8efa8b5342d3"
		},
		"e6d26d41-d690-440c-8d3a-bcc538c32efe": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow51",
			"name": "SequenceFlow51",
			"sourceRef": "8148593d-e374-4fee-ba03-f7cc5f7b32bc",
			"targetRef": "9231260e-ab9e-4be9-9c6c-27be8b122559"
		},
		"3b7d60d1-f793-45a5-8c3c-d89e91526078": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow53",
			"name": "SequenceFlow53",
			"sourceRef": "9787ec18-b278-43c0-84fd-af913579f94b",
			"targetRef": "3d82a1ea-fe26-4fdb-85de-b14c4133a261"
		},
		"23eba0af-9fe2-42d2-9a35-242782d3c798": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow55",
			"name": "SequenceFlow55",
			"sourceRef": "9787ec18-b278-43c0-84fd-af913579f94b",
			"targetRef": "9231260e-ab9e-4be9-9c6c-27be8b122559"
		},
		"efe5128c-8132-4f72-92fc-01888aba362c": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow56",
			"name": "SequenceFlow56",
			"sourceRef": "3d82a1ea-fe26-4fdb-85de-b14c4133a261",
			"targetRef": "0dc12446-5d11-490b-b9db-db417b741900"
		},
		"ef166de3-fe39-4dc4-acea-09780c04900d": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.PostNextEntry==\"true\"}",
			"id": "sequenceflow57",
			"name": "New Create",
			"sourceRef": "0dc12446-5d11-490b-b9db-db417b741900",
			"targetRef": "a545f88c-df4d-42a8-98c3-4f339106e67c"
		},
		"2461797a-492b-43db-833c-2a219cd1cf50": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow60",
			"name": "No Create",
			"sourceRef": "0dc12446-5d11-490b-b9db-db417b741900",
			"targetRef": "5ffcce5e-a1ad-45bf-b2ee-fbfe0e4fc2f9"
		},
		"6e475a70-a956-44b6-b649-f47405856d9b": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow61",
			"name": "SequenceFlow61",
			"sourceRef": "5ffcce5e-a1ad-45bf-b2ee-fbfe0e4fc2f9",
			"targetRef": "386d028e-f8c6-4639-8804-471c18aebe0a"
		},
		"42fb1507-b187-43f3-aa40-efda458adb22": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow62",
			"name": "SequenceFlow62",
			"sourceRef": "f4591eb5-c6d2-4d24-948b-8efa8b5342d3",
			"targetRef": "386d028e-f8c6-4639-8804-471c18aebe0a"
		},
		"b7538dc3-4d69-4ef9-816c-27260b59e09e": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow63",
			"name": "SequenceFlow63",
			"sourceRef": "386d028e-f8c6-4639-8804-471c18aebe0a",
			"targetRef": "6b621f2a-a47d-463c-8b59-329ae3c57f91"
		},
		"777deb00-3e69-43ee-85d1-dfbe9e645873": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow64",
			"name": "SequenceFlow64",
			"sourceRef": "a545f88c-df4d-42a8-98c3-4f339106e67c",
			"targetRef": "3d82a1ea-fe26-4fdb-85de-b14c4133a261"
		},
		"c1b03b3f-2c3d-4f8f-9292-96c5dec86f19": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow65",
			"name": "SequenceFlow65",
			"sourceRef": "9787ec18-b278-43c0-84fd-af913579f94b",
			"targetRef": "28ebbc6c-9a73-41c6-bfc9-a2623d4768c6"
		},
		"9859ae3b-686e-43e8-aa2b-461afc6b0bb9": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow66",
			"name": "SequenceFlow66",
			"sourceRef": "28ebbc6c-9a73-41c6-bfc9-a2623d4768c6",
			"targetRef": "09701a38-e680-4fc8-8939-5fdeef19dd2a"
		},
		"b35ca506-e6b5-49d2-988c-3ec48e7bbded": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow67",
			"name": "No Delete",
			"sourceRef": "09701a38-e680-4fc8-8939-5fdeef19dd2a",
			"targetRef": "2a9b018f-4bff-4d0a-a82c-c8388431e2d4"
		},
		"5071d19a-c234-4ff3-8f88-50f51e7c465a": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow68",
			"name": "SequenceFlow68",
			"sourceRef": "81b92f7a-3106-4c02-b3d5-3475894abc93",
			"targetRef": "28ebbc6c-9a73-41c6-bfc9-a2623d4768c6"
		},
		"a69479e5-41bd-4658-9484-d2730e2df0d2": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow70",
			"name": "SequenceFlow70",
			"sourceRef": "2a9b018f-4bff-4d0a-a82c-c8388431e2d4",
			"targetRef": "386d028e-f8c6-4639-8804-471c18aebe0a"
		},
		"37ceff40-df86-4a01-af6d-57045f1d071e": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.DeleteNextEntry==\"true\"}",
			"id": "sequenceflow71",
			"name": "New Delete",
			"sourceRef": "09701a38-e680-4fc8-8939-5fdeef19dd2a",
			"targetRef": "81b92f7a-3106-4c02-b3d5-3475894abc93"
		},
		"76698d72-5c45-496b-906b-ae06353d9671": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow72",
			"name": "SequenceFlow72",
			"sourceRef": "a888e56e-8996-4432-be6f-08851fc5597d",
			"targetRef": "100217fe-6c47-429a-a8a6-951a20a85fb1"
		},
		"8864c43a-ba92-4301-ae5b-26f9e6af1e89": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow74",
			"name": "SequenceFlow74",
			"sourceRef": "e18e3470-7c25-4e33-bca4-0076d0e77052",
			"targetRef": "ad4a1134-a92d-4f05-a260-e0e1a8fa8ff6"
		},
		"b3c7ed91-4ca6-44ae-9ff5-6ab270ea35b1": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow75",
			"name": "SequenceFlow75",
			"sourceRef": "ad4a1134-a92d-4f05-a260-e0e1a8fa8ff6",
			"targetRef": "08b926cc-de26-47f6-b850-7a7b3b3daa56"
		},
		"f8234ce4-3d01-464b-a30f-a5eabcdd9045": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow76",
			"name": "SequenceFlow76",
			"sourceRef": "a6fbb0ad-8c70-4f96-86a5-803bb47219a4",
			"targetRef": "e18e3470-7c25-4e33-bca4-0076d0e77052"
		},
		"2881a123-b74f-4877-bce1-ec1f24205322": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"e0c910f1-5cd2-4c79-83f2-33b18142350b": {},
				"4136b299-0c84-48e8-a7e9-fdde9c2e7ddc": {},
				"fedfa54c-4a7b-49af-b659-403190be43d9": {},
				"52a0aedf-7f91-4953-88fc-e9697a742b3c": {},
				"1fc693a0-4f40-4cf5-9b50-9dc7427e0f45": {},
				"a3c1b5ab-a6d6-45db-80a3-8e630a451b90": {},
				"db081ea0-6a89-4e5a-ba35-cec2b3195e7c": {},
				"0908f619-8127-4679-9011-2df890616bc6": {},
				"11af1fb3-edfc-42d9-a089-fd8408b069b0": {},
				"5fdba5b6-34a8-4b63-8ecd-0aa3bdaf87fd": {},
				"9a228265-8946-45aa-89c2-aab44a758396": {},
				"b7327a42-d4db-482f-b79a-6792d8886a11": {},
				"24d6515a-3113-4ebc-83b6-7d173465b818": {},
				"5f312675-dc1a-47d5-a76d-e7e1e111af98": {},
				"f4067160-2e0a-4aad-b63d-acf7a990e89d": {},
				"31718260-89bd-482e-bdcb-eab7a64ca2b8": {},
				"8c57ef4c-2ba9-4b43-b54f-573a8f6f7c73": {},
				"37004d36-cb5a-4cdf-bb01-0185eff55ebb": {},
				"773d2fa8-fb6c-401b-9ead-935477e6f12a": {},
				"bb079416-e531-46c3-a7b2-f989a5615a37": {},
				"85777335-5b7b-4eb8-b5f0-5758a8b2e8c0": {},
				"468518e9-45ec-4166-b0b6-6c488f720265": {},
				"acbfa0cf-ba9e-45a7-a9cf-dcfb73201bdd": {},
				"4bb43fed-1a40-478e-a6c6-8b32de9b58d7": {},
				"bb4887f1-c543-4394-abe7-657615085371": {},
				"04f88b34-b887-49e0-89ab-d2642e8289ad": {},
				"ff050935-18a3-4fd5-a8a0-1661fc500e0d": {},
				"ede19b38-9f7b-4ce0-8db7-357df6cbd2ae": {},
				"1d517666-b103-4ac8-b41a-8a96ac7080fc": {},
				"31c6810b-4fad-4f45-9cdb-61eef002417c": {},
				"eefd4637-83e4-4020-a110-0fae60aa065e": {},
				"ebbdc00f-5b7e-459a-b1c7-a31f8164e0cc": {},
				"adfb5048-3bae-465f-8a71-09bf51b7b340": {},
				"3c50e53a-8d4d-4f51-8ea7-0efe680167b1": {},
				"b258aac9-ef6e-41d0-80d7-7617068c499a": {},
				"7940a9e8-9e44-447c-ac92-9e2eb2070227": {},
				"5575967d-e617-402f-8ca8-5e0dd376e4a1": {},
				"c7990683-46e2-40b1-9434-88dfc8c04d30": {},
				"97637962-397b-4ec7-8c89-d3ce8747950f": {},
				"522bc88f-4c56-4310-93dc-09a6a16f02cb": {},
				"4afeb97a-35ff-4e35-9ca8-bae470f33abe": {},
				"1aed3ff9-7b26-48a7-9038-339f0d081ec0": {},
				"429a169b-4f24-437e-ac41-754649e7693f": {},
				"a7599261-eb75-451a-b8d8-c39c73480c86": {},
				"d3a11935-5d8a-42cc-b467-3c511385b781": {},
				"bf2a9d33-672f-4806-bfef-4d6704cc631d": {},
				"4dfe78bd-bfa9-4774-834d-febcafbfb39e": {},
				"42ae5929-2cdd-41eb-95b9-3ec934296849": {},
				"29315662-a73d-4e14-a6e5-cb947a65a56c": {},
				"62a1afca-db45-48e6-b3ee-e5f566a7ef6b": {},
				"a1844964-5538-4285-a5ec-e624513b9e6f": {},
				"47205f10-9309-476c-9c5a-509ae0206074": {},
				"b8e0c106-67e4-4a9c-a080-b4cae575c7e3": {},
				"325e6df8-a153-463c-942b-6b63a7b55030": {}
			}
		},
		"6e3abb4d-e253-408b-8b41-48bf049fbed0": {
			"classDefinition": "com.sap.bpm.wfs.TerminateEventDefinition",
			"id": "terminateeventdefinition2"
		},
		"bc1e5a14-2ac5-49e1-b8f6-812c9578cd7d": {
			"classDefinition": "com.sap.bpm.wfs.TimerEventDefinition",
			"timeDuration": "PT12H",
			"id": "timereventdefinition2"
		},
		"e0c910f1-5cd2-4c79-83f2-33b18142350b": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": -239,
			"y": 81.49651514076325,
			"width": 32,
			"height": 32,
			"object": "3e83dbc7-7f13-4e51-b914-b018441b0818"
		},
		"4136b299-0c84-48e8-a7e9-fdde9c2e7ddc": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": -150,
			"y": 67.49651514076326,
			"width": 100,
			"height": 60,
			"object": "dadf4a44-6474-4755-87a7-fc18819dc2b0"
		},
		"fedfa54c-4a7b-49af-b659-403190be43d9": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "-207,97.49651514076325 -150,97.49651514076325",
			"sourceSymbol": "e0c910f1-5cd2-4c79-83f2-33b18142350b",
			"targetSymbol": "4136b299-0c84-48e8-a7e9-fdde9c2e7ddc",
			"object": "0e3e8cd8-ed15-43a8-9dc1-5484c4bc2799"
		},
		"52a0aedf-7f91-4953-88fc-e9697a742b3c": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 596.9999964237213,
			"y": 67.31243924092132,
			"width": 100,
			"height": 60,
			"object": "08b926cc-de26-47f6-b850-7a7b3b3daa56"
		},
		"1fc693a0-4f40-4cf5-9b50-9dc7427e0f45": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 773.9999964237213,
			"y": 76.31243924092132,
			"object": "3f06b037-b9a1-4766-b6cb-7a5163d69ee3"
		},
		"a3c1b5ab-a6d6-45db-80a3-8e630a451b90": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "795,97.31243896484375 795,-180.68756103515625 883.9999964237213,-180.68756075907868",
			"sourceSymbol": "1fc693a0-4f40-4cf5-9b50-9dc7427e0f45",
			"targetSymbol": "4bb43fed-1a40-478e-a6c6-8b32de9b58d7",
			"object": "43ec4905-9c9c-44dd-8c63-0ed28d13863a"
		},
		"db081ea0-6a89-4e5a-ba35-cec2b3195e7c": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "794.9999964237213,93.17312983933402 795,168.31243896484375 1575,168.31243896484375 1574.9999940395355,101.17312983933402",
			"sourceSymbol": "1fc693a0-4f40-4cf5-9b50-9dc7427e0f45",
			"targetSymbol": "0908f619-8127-4679-9011-2df890616bc6",
			"object": "e0d66b73-d723-4327-bc2c-500be9a378f4"
		},
		"0908f619-8127-4679-9011-2df890616bc6": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1553.9999940395355,
			"y": 76.03382043774673,
			"object": "6b621f2a-a47d-463c-8b59-329ae3c57f91"
		},
		"11af1fb3-edfc-42d9-a089-fd8408b069b0": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 1640.9999928474426,
			"y": 81.44589638852062,
			"width": 32,
			"height": 32,
			"object": "100217fe-6c47-429a-a8a6-951a20a85fb1"
		},
		"5fdba5b6-34a8-4b63-8ecd-0aa3bdaf87fd": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1574.9999940395355,97.23985841313367 1656.9999928474426,97.23985841313367",
			"sourceSymbol": "0908f619-8127-4679-9011-2df890616bc6",
			"targetSymbol": "11af1fb3-edfc-42d9-a089-fd8408b069b0",
			"object": "f8859448-7a3d-4e46-99be-915afa7dafe4"
		},
		"9a228265-8946-45aa-89c2-aab44a758396": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 1233.9999952316284,
			"y": -2,
			"width": 100,
			"height": 60,
			"object": "8148593d-e374-4fee-ba03-f7cc5f7b32bc"
		},
		"b7327a42-d4db-482f-b79a-6792d8886a11": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "-50,97.49651514076325 -6,97.49651514076325",
			"sourceSymbol": "4136b299-0c84-48e8-a7e9-fdde9c2e7ddc",
			"targetSymbol": "5f312675-dc1a-47d5-a76d-e7e1e111af98",
			"object": "0ca50fee-cf26-4541-821c-3299309adf33"
		},
		"24d6515a-3113-4ebc-83b6-7d173465b818": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "646.9999964237213,97.31243924092132 794.9999964237213,97.31243924092132",
			"sourceSymbol": "52a0aedf-7f91-4953-88fc-e9697a742b3c",
			"targetSymbol": "1fc693a0-4f40-4cf5-9b50-9dc7427e0f45",
			"object": "90f3a1b4-c14e-4336-9a83-8581f3fbd050"
		},
		"5f312675-dc1a-47d5-a76d-e7e1e111af98": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": -6,
			"y": 67.49651514076325,
			"width": 100,
			"height": 60,
			"object": "deab2278-90ec-4666-9977-70187a69ed81"
		},
		"f4067160-2e0a-4aad-b63d-acf7a990e89d": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 165.9999988079071,
			"y": 66.83102093478658,
			"width": 100,
			"height": 60,
			"object": "a6fbb0ad-8c70-4f96-86a5-803bb47219a4",
			"symbols": {
				"b7028ab1-1e06-404c-8b94-e794c0b3a1c2": {}
			}
		},
		"31718260-89bd-482e-bdcb-eab7a64ca2b8": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "94,97.1637680377749 165.9999988079071,97.1637680377749",
			"sourceSymbol": "5f312675-dc1a-47d5-a76d-e7e1e111af98",
			"targetSymbol": "f4067160-2e0a-4aad-b63d-acf7a990e89d",
			"object": "68c31478-a079-4632-b095-93acf2c96f6f"
		},
		"8c57ef4c-2ba9-4b43-b54f-573a8f6f7c73": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 974.9999964237213,
			"y": -1.6875607590786785,
			"width": 100,
			"height": 60,
			"object": "9231260e-ab9e-4be9-9c6c-27be8b122559"
		},
		"37004d36-cb5a-4cdf-bb01-0185eff55ebb": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1123.9999964237213,
			"y": 7.3124392409213215,
			"object": "b38789c6-eab8-41e4-86e0-eaae0b8fd95e"
		},
		"773d2fa8-fb6c-401b-9ead-935477e6f12a": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1024.9999964237213,28.31243924092132 1144.9999964237213,28.31243924092132",
			"sourceSymbol": "8c57ef4c-2ba9-4b43-b54f-573a8f6f7c73",
			"targetSymbol": "37004d36-cb5a-4cdf-bb01-0185eff55ebb",
			"object": "012a5d03-a1a3-4b77-915b-553bb7fdcb7c"
		},
		"bb079416-e531-46c3-a7b2-f989a5615a37": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1149,28.156219482421875 1234.4999952316284,28.156219482421875",
			"sourceSymbol": "37004d36-cb5a-4cdf-bb01-0185eff55ebb",
			"targetSymbol": "9a228265-8946-45aa-89c2-aab44a758396",
			"object": "e6450bd4-b175-438b-b4d9-4baa1c0f70b0"
		},
		"85777335-5b7b-4eb8-b5f0-5758a8b2e8c0": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1393.9999952316284,
			"y": 7,
			"object": "f4591eb5-c6d2-4d24-948b-8efa8b5342d3"
		},
		"468518e9-45ec-4166-b0b6-6c488f720265": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1144.9999964237213,28.31243924092132 1145,81 1414,81 1414,39",
			"sourceSymbol": "37004d36-cb5a-4cdf-bb01-0185eff55ebb",
			"targetSymbol": "85777335-5b7b-4eb8-b5f0-5758a8b2e8c0",
			"object": "2d3400b0-d4bc-4796-bfff-24aaa4bba150"
		},
		"acbfa0cf-ba9e-45a7-a9cf-dcfb73201bdd": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1279,28 1279,-27 1015,-27 1015,8",
			"sourceSymbol": "9a228265-8946-45aa-89c2-aab44a758396",
			"targetSymbol": "8c57ef4c-2ba9-4b43-b54f-573a8f6f7c73",
			"object": "e6d26d41-d690-440c-8d3a-bcc538c32efe"
		},
		"4bb43fed-1a40-478e-a6c6-8b32de9b58d7": {
			"classDefinition": "com.sap.bpm.wfs.ui.ParallelGatewaySymbol",
			"x": 862.9999964237213,
			"y": -201.68756075907868,
			"object": "9787ec18-b278-43c0-84fd-af913579f94b"
		},
		"bb4887f1-c543-4394-abe7-657615085371": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "883.9999964237213,-180.84378037953934 1024.75,-180.84378037953934",
			"sourceSymbol": "4bb43fed-1a40-478e-a6c6-8b32de9b58d7",
			"targetSymbol": "04f88b34-b887-49e0-89ab-d2642e8289ad",
			"object": "3b7d60d1-f793-45a5-8c3c-d89e91526078"
		},
		"04f88b34-b887-49e0-89ab-d2642e8289ad": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 974.7499964237213,
			"y": -210.68756075907868,
			"width": 100,
			"height": 60,
			"object": "3d82a1ea-fe26-4fdb-85de-b14c4133a261"
		},
		"ff050935-18a3-4fd5-a8a0-1661fc500e0d": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "883.9999964237213,-180.68756075907868 884,26 985,26",
			"sourceSymbol": "4bb43fed-1a40-478e-a6c6-8b32de9b58d7",
			"targetSymbol": "8c57ef4c-2ba9-4b43-b54f-573a8f6f7c73",
			"object": "23eba0af-9fe2-42d2-9a35-242782d3c798"
		},
		"ede19b38-9f7b-4ce0-8db7-357df6cbd2ae": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1123.7499964237213,
			"y": -201.68756075907868,
			"object": "0dc12446-5d11-490b-b9db-db417b741900"
		},
		"1d517666-b103-4ac8-b41a-8a96ac7080fc": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1024.7499964237213,-180.68756075907868 1144.7499964237213,-180.68756075907868",
			"sourceSymbol": "04f88b34-b887-49e0-89ab-d2642e8289ad",
			"targetSymbol": "ede19b38-9f7b-4ce0-8db7-357df6cbd2ae",
			"object": "efe5128c-8132-4f72-92fc-01888aba362c"
		},
		"31c6810b-4fad-4f45-9cdb-61eef002417c": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 1233.7499964237213,
			"y": -210.68756075907868,
			"width": 100,
			"height": 60,
			"object": "a545f88c-df4d-42a8-98c3-4f339106e67c"
		},
		"eefd4637-83e4-4020-a110-0fae60aa065e": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1144.7499964237213,-180.68756075907868 1283.7499964237213,-180.68756075907868",
			"sourceSymbol": "ede19b38-9f7b-4ce0-8db7-357df6cbd2ae",
			"targetSymbol": "31c6810b-4fad-4f45-9cdb-61eef002417c",
			"object": "ef166de3-fe39-4dc4-acea-09780c04900d"
		},
		"ebbdc00f-5b7e-459a-b1c7-a31f8164e0cc": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1394,
			"y": -202.5,
			"object": "5ffcce5e-a1ad-45bf-b2ee-fbfe0e4fc2f9"
		},
		"adfb5048-3bae-465f-8a71-09bf51b7b340": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1144.7499964237213,-181.09378037953934 1144.7499964237213,-116 1415,-116 1415,-181.09378037953934",
			"sourceSymbol": "ede19b38-9f7b-4ce0-8db7-357df6cbd2ae",
			"targetSymbol": "ebbdc00f-5b7e-459a-b1c7-a31f8164e0cc",
			"object": "2461797a-492b-43db-833c-2a219cd1cf50"
		},
		"3c50e53a-8d4d-4f51-8ea7-0efe680167b1": {
			"classDefinition": "com.sap.bpm.wfs.ui.ParallelGatewaySymbol",
			"x": 1485,
			"y": -202.5,
			"object": "386d028e-f8c6-4639-8804-471c18aebe0a"
		},
		"b258aac9-ef6e-41d0-80d7-7617068c499a": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1415,-181.5 1506,-181.5",
			"sourceSymbol": "ebbdc00f-5b7e-459a-b1c7-a31f8164e0cc",
			"targetSymbol": "3c50e53a-8d4d-4f51-8ea7-0efe680167b1",
			"object": "6e475a70-a956-44b6-b649-f47405856d9b"
		},
		"7940a9e8-9e44-447c-ac92-9e2eb2070227": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1414.9999952316284,28 1505.9999974507987,28.000004142451786 1506.0000022191703,-76.74999585754821 1506,-76.75 1506,-176",
			"sourceSymbol": "85777335-5b7b-4eb8-b5f0-5758a8b2e8c0",
			"targetSymbol": "3c50e53a-8d4d-4f51-8ea7-0efe680167b1",
			"object": "42fb1507-b187-43f3-aa40-efda458adb22"
		},
		"5575967d-e617-402f-8ca8-5e0dd376e4a1": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1506,-181.5 1578.5,-181.5 1578.5,86",
			"sourceSymbol": "3c50e53a-8d4d-4f51-8ea7-0efe680167b1",
			"targetSymbol": "0908f619-8127-4679-9011-2df890616bc6",
			"object": "b7538dc3-4d69-4ef9-816c-27260b59e09e"
		},
		"c7990683-46e2-40b1-9434-88dfc8c04d30": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1283.7499964237213,-180.68756075907868 1283.75,-242 1024.75,-242 1024.7499964237213,-210.18756075907868",
			"sourceSymbol": "31c6810b-4fad-4f45-9cdb-61eef002417c",
			"targetSymbol": "04f88b34-b887-49e0-89ab-d2642e8289ad",
			"object": "777deb00-3e69-43ee-85d1-dfbe9e645873"
		},
		"97637962-397b-4ec7-8c89-d3ce8747950f": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 974.9999964237213,
			"y": -393.6875607590787,
			"width": 100,
			"height": 60,
			"object": "28ebbc6c-9a73-41c6-bfc9-a2623d4768c6"
		},
		"522bc88f-4c56-4310-93dc-09a6a16f02cb": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "883.9999964237213,-180.68756075907868 884,-359 1025,-359",
			"sourceSymbol": "4bb43fed-1a40-478e-a6c6-8b32de9b58d7",
			"targetSymbol": "97637962-397b-4ec7-8c89-d3ce8747950f",
			"object": "c1b03b3f-2c3d-4f8f-9292-96c5dec86f19"
		},
		"4afeb97a-35ff-4e35-9ca8-bae470f33abe": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1123.9999964237213,
			"y": -384.6875607590787,
			"object": "09701a38-e680-4fc8-8939-5fdeef19dd2a"
		},
		"1aed3ff9-7b26-48a7-9038-339f0d081ec0": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1024.9999964237213,-363.6875607590787 1144.9999964237213,-363.6875607590787",
			"sourceSymbol": "97637962-397b-4ec7-8c89-d3ce8747950f",
			"targetSymbol": "4afeb97a-35ff-4e35-9ca8-bae470f33abe",
			"object": "9859ae3b-686e-43e8-aa2b-461afc6b0bb9"
		},
		"429a169b-4f24-437e-ac41-754649e7693f": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 1215.9999964237213,
			"y": -393.6875607590787,
			"width": 100,
			"height": 60,
			"object": "81b92f7a-3106-4c02-b3d5-3475894abc93"
		},
		"a7599261-eb75-451a-b8d8-c39c73480c86": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1144,-363.68756103515625 1143.9999999462757,-311 1414.749996369997,-310.99999972392243 1414.7499964237213,-363.6875607590787",
			"sourceSymbol": "4afeb97a-35ff-4e35-9ca8-bae470f33abe",
			"targetSymbol": "bf2a9d33-672f-4806-bfef-4d6704cc631d",
			"object": "b35ca506-e6b5-49d2-988c-3ec48e7bbded"
		},
		"d3a11935-5d8a-42cc-b467-3c511385b781": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1268,-363.68756103515625 1268,-424 1025,-424 1024.9999964237213,-393.1875607590787",
			"sourceSymbol": "429a169b-4f24-437e-ac41-754649e7693f",
			"targetSymbol": "97637962-397b-4ec7-8c89-d3ce8747950f",
			"object": "5071d19a-c234-4ff3-8f88-50f51e7c465a"
		},
		"bf2a9d33-672f-4806-bfef-4d6704cc631d": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1393.7499964237213,
			"y": -384.6875607590787,
			"object": "2a9b018f-4bff-4d0a-a82c-c8388431e2d4"
		},
		"4dfe78bd-bfa9-4774-834d-febcafbfb39e": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1414.75,-365 1509,-365 1509,-173",
			"sourceSymbol": "bf2a9d33-672f-4806-bfef-4d6704cc631d",
			"targetSymbol": "3c50e53a-8d4d-4f51-8ea7-0efe680167b1",
			"object": "a69479e5-41bd-4658-9484-d2730e2df0d2"
		},
		"42ae5929-2cdd-41eb-95b9-3ec934296849": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1144.9999964237213,-363 1226,-363",
			"sourceSymbol": "4afeb97a-35ff-4e35-9ca8-bae470f33abe",
			"targetSymbol": "429a169b-4f24-437e-ac41-754649e7693f",
			"object": "37ceff40-df86-4a01-af6d-57045f1d071e"
		},
		"29315662-a73d-4e14-a6e5-cb947a65a56c": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "215.9999988079071,142.83102093478658 216,205.5 1664,205.5 1664,95",
			"sourceSymbol": "b7028ab1-1e06-404c-8b94-e794c0b3a1c2",
			"targetSymbol": "11af1fb3-edfc-42d9-a089-fd8408b069b0",
			"object": "76698d72-5c45-496b-906b-ae06353d9671"
		},
		"62a1afca-db45-48e6-b3ee-e5f566a7ef6b": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 311.99999701976776,
			"y": 67.27642697892497,
			"width": 100,
			"height": 60,
			"object": "e18e3470-7c25-4e33-bca4-0076d0e77052"
		},
		"a1844964-5538-4285-a5ec-e624513b9e6f": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 454.99999701976776,
			"y": 67.27642697892497,
			"width": 100,
			"height": 60,
			"object": "ad4a1134-a92d-4f05-a260-e0e1a8fa8ff6"
		},
		"47205f10-9309-476c-9c5a-509ae0206074": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "361.99999701976776,97.27642697892497 504.99999701976776,97.27642697892497",
			"sourceSymbol": "62a1afca-db45-48e6-b3ee-e5f566a7ef6b",
			"targetSymbol": "a1844964-5538-4285-a5ec-e624513b9e6f",
			"object": "8864c43a-ba92-4301-ae5b-26f9e6af1e89"
		},
		"b8e0c106-67e4-4a9c-a080-b4cae575c7e3": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "504.99999701976776,97.27642697892497 609,97.27642697892497",
			"sourceSymbol": "a1844964-5538-4285-a5ec-e624513b9e6f",
			"targetSymbol": "52a0aedf-7f91-4953-88fc-e9697a742b3c",
			"object": "b3c7ed91-4ca6-44ae-9ff5-6ab270ea35b1"
		},
		"325e6df8-a153-463c-942b-6b63a7b55030": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "215.9999988079071,96.83102093478658 329,96.83102093478658",
			"sourceSymbol": "f4067160-2e0a-4aad-b63d-acf7a990e89d",
			"targetSymbol": "62a1afca-db45-48e6-b3ee-e5f566a7ef6b",
			"object": "f8234ce4-3d01-464b-a30f-a5eabcdd9045"
		},
		"b7028ab1-1e06-404c-8b94-e794c0b3a1c2": {
			"classDefinition": "com.sap.bpm.wfs.ui.BoundaryEventSymbol",
			"x": 199.9999988079071,
			"y": 110.83102093478658,
			"object": "a888e56e-8996-4432-be6f-08851fc5597d"
		},
		"f05b1e62-4db2-4052-9b65-ee721dfb7184": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"terminateeventdefinition": 2,
			"messageeventdefinition": 1,
			"timereventdefinition": 2,
			"maildefinition": 2,
			"hubapireference": 7,
			"sequenceflow": 77,
			"startevent": 2,
			"intermediatemessageevent": 1,
			"boundarytimerevent": 1,
			"endevent": 2,
			"usertask": 2,
			"servicetask": 15,
			"scripttask": 10,
			"mailtask": 2,
			"exclusivegateway": 8,
			"parallelgateway": 4
		},
		"f8809ef9-e820-4d1f-91d1-42948f7bdcd7": {
			"classDefinition": "com.sap.bpm.wfs.HubAPIReference",
			"apiPackage": "SAPS4HANACloud",
			"api": "API_BUSINESS_PARTNER",
			"apiName": "OData Service for Business Partner",
			"id": "hubapireference3"
		}
	}
}