var aCurrentBanks = $.context.CurrentBankData.d.results;

for (var i=0; i < aCurrentBanks.length; i++) {
	if (aCurrentBanks[i].BankIdentification === $.context.ChangedBankingData.BankIdentification) {
		$.context.CurrentBankData = aCurrentBanks[i];
	}
}