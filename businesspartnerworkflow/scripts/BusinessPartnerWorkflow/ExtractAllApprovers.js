var aApproverData = $.context.Approvers.d.results;
var sAllApprovers = "";
if ($.context.StartedBy.name !== aApproverData[0].UserID) {
	sAllApprovers = aApproverData[0].UserID;	
}

for (var i = 1; i < aApproverData.length ; i++ ){
	if ($.context.StartedBy.name !== aApproverData[i].UserID) {
		sAllApprovers = sAllApprovers + "," + aApproverData[i].UserID;
	}
}

$.context.Approvers = sAllApprovers;