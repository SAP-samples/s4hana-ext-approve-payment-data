sap.ui.define([
	"sap/ui/model/SimpleType"
], function (SimpleType) {
	"use strict";
	return SimpleType.extend("com.sap.workflow.ChangePaymentData.model.CustomDateType", {
		
		/**
		 * Formats the given date into a human readable date
		 *
		 * @public
		 * @param {string} sDate that should be formatted
		 * @returns {Date} Date in formatted form
		 */
		formatValue: function (sDate) {
			if (sDate === undefined) {
				return "";
			}
			if (!sDate) {
				return "";
			}
			var oType = new sap.ui.model.type.Date({style: "short"});
			return oType.formatValue(new Date(parseInt(sDate.substr(6), 10)), "string");
		},
		
		/**
		 * Parses a date into UNIX Epoch time
		 * @public
		 * @param sDate
		 * @returns {string} Date in UNIX Epoch time
		 */
		parseValue: function (sDate) {
			var oDate = new Date(sDate);

			return "/Date(" + (oDate.getTime() - oDate.getTimezoneOffset() * 60 * 1000).toString() + "+0000)/";
		},
		
		/**
		 * Validates the value to be parsed
		 *
		 * @public
		 * Since there is only true and false, no client side validation is required
		 * @returns {boolean} true
		 */
		validateValue: function () {
			return true;
		}

	});
});