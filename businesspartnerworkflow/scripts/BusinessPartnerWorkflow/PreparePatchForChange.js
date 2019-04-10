var aChangedBankData = $.context.ChangedBankingData;  
var iArraySize = aChangedBankData.length;
$.context.PatchChangedData = undefined;

for ( var i = 0 ; i < iArraySize ; i++ ) {
	if ( aChangedBankData[i].Status === "ToBeChanged" ) {
		delete aChangedBankData[i].Status;
		$.context.PatchChangedData = aChangedBankData[i];
		$.context.PatchNextEntry = true;
		aChangedBankData.splice(i,1);
		$.context.ChangedBankingData = aChangedBankData;
		break;
	}
}

if ($.context.PatchChangedData === undefined) {
	$.context.PatchNextEntry = false;
} 
