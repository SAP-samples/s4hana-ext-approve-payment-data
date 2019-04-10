var aChangedBankData = $.context.ChangedBankingData;  
var iArraySize = aChangedBankData.length;
$.context.DeleteRequestData = undefined;

for ( var i = 0 ; i < iArraySize ; i++ ) {
	if ( aChangedBankData[i].Status === "ToBeDeleted" ) {
		$.context.DeleteRequestData = aChangedBankData[i];
		$.context.DeleteNextEntry = true;
		aChangedBankData.splice(i,1);
		$.context.ChangedBankingData = aChangedBankData;
		break;
	}
}

if ($.context.DeleteRequestData === undefined) {
	$.context.DeleteNextEntry = false;
} 