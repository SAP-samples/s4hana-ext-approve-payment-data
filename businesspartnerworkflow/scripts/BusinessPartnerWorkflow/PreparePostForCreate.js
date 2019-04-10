//It should be ensured that the BankIdentification on the entry is set 
//in a way that it is unique and non existing in the system, for that busniess parter

var aChangedBankData = $.context.ChangedBankingData;  
var iArraySize = aChangedBankData.length;
$.context.PostRequestData = undefined;

for ( var i = 0 ; i < iArraySize ; i++ ) {
	if ( aChangedBankData[i].Status === "ToBeCreated" ) {
		delete aChangedBankData[i].Status;
		$.context.PostRequestData = aChangedBankData[i];
		$.context.PostNextEntry = true;
		aChangedBankData.splice(i,1);
		$.context.ChangedBankingData = aChangedBankData;
		break;
	}
}

if ($.context.PostRequestData === undefined) {
	$.context.PostNextEntry = false;
} 
