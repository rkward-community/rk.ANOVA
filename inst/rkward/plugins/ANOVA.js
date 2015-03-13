// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here
	var chcSpprsspc = getValue("chc_Spprsspc");
	if(chcSpprsspc) {
		echo("suppressMessages(require(" + "ez" + "))\n");
	} else {
		echo("require(" + "ez" + ")\n");
	}
}

function calculate(){
	// read in variables from dialog

	var vrslDtmstbdt = getString("vrsl_Dtmstbdt");
	var radDesign = getString("rad_Design");
	var vrslDpndntvr = getString("vrsl_Dpndntvr");
	var vrslCssbjctd = getString("vrsl_Cssbjctd");
	var vrslWthnsbjc = getString("vrsl_Wthnsbjc");
	var vrslBtwnsbjc = getString("vrsl_Btwnsbjc");
	var vrslObsrvdvr = getString("vrsl_Obsrvdvr");
	var drpSmsfsqrs = getString("drp_Smsfsqrs");
	var drpHtrscdst = getString("drp_Htrscdst");
	var svbSvrsltst = getString("svb_Svrsltst");
	var chcShwsmsfs = getBoolean("chc_Shwsmsfs.state");
	var chcRtrnvbjc = getBoolean("chc_Rtrnvbjc.state");
	var chcSpprsspc = getBoolean("chc_Spprsspc.state");

	// the R code to be evaluated
	var vrslDpndntvrShortname = getValue("vrsl_Dpndntvr.shortname").split("\n").join(", ");
	var vrslCssbjctdShortname = getValue("vrsl_Cssbjctd.shortname").split("\n").join(", ");
	var vrslWthnsbjcShortname = getValue("vrsl_Wthnsbjc.shortname").split("\n").join(", ");
	var vrslBtwnsbjcShortname = getValue("vrsl_Btwnsbjc.shortname").split("\n").join(", ");
	var vrslObsrvdvrShortname = getValue("vrsl_Obsrvdvr.shortname").split("\n").join(", ");
	if(drpSmsfsqrs == 3) {
		echo("\t# set contrasts for accurate type 3 ANOVA\n\toptions(contrasts=c(\"contr.sum\",\"contr.poly\"))\n");
	} else {}
	if(vrslCssbjctd == "" & radDesign == "between") {
		echo("\t# ezANOVA demands a subject identifier variable\n\t" + vrslDtmstbdt + " <- cbind(" + vrslDtmstbdt + ", ez.subject.ID.dummy=factor(1:nrow(" + vrslDtmstbdt + ")))\n");
	} else {}
	echo("\tanova.results <- ezANOVA(");
	if(vrslDtmstbdt) {
		echo("\n\t\tdata=" + vrslDtmstbdt);
	} else {}
	if(vrslDpndntvr) {
		echo(",\n\t\tdv=.(" + vrslDpndntvrShortname + ")");
	} else {}
	if(vrslCssbjctd) {
		echo(",\n\t\twid=.(" + vrslCssbjctdShortname + ")");
	} else if(radDesign == "between") {
		echo(",\n\t\twid=.(ez.subject.ID.dummy)");
	}
	if(vrslWthnsbjc != "" & radDesign != "between") {
		echo(",\n\t\twithin=.(" + vrslWthnsbjcShortname + ")");
	} else {}
	if(vrslBtwnsbjc != "" & radDesign != "within") {
		echo(",\n\t\tbetween=.(" + vrslBtwnsbjcShortname + ")");
	} else {}
	if(vrslObsrvdvr) {
		echo(",\n\t\tobserved=.(" + vrslObsrvdvrShortname + ")");
	} else {}
	if(drpSmsfsqrs != 2) {
		echo(",\n\t\ttype=" + drpSmsfsqrs);
	} else {}
	if(drpHtrscdst != "false") {
		echo(",\n\t\twhite.adjust=\"" + drpHtrscdst + "\"");
	} else {}
	if(chcShwsmsfs) {
		echo(",\n\t\tdetailed=TRUE");
	} else {}
	if(chcRtrnvbjc) {
		echo(",\n\t\treturn_aov=TRUE");
	} else {}
	echo(")\n\n");
}

function printout(){
	// printout the results
	new Header(i18n("ANOVA results")).print();


	echo("rk.print(anova.results[[\"ANOVA\"]])\n");
	echo("\tif(\"Mauchly's Test for Sphericity\" %in% names(anova.results)){\n    rk.header(\"Mauchly's Test for Sphericity\", level=3)\n    rk.print(anova.results[[\"Mauchly's Test for Sphericity\"]])\n  } else {}\n");
	echo("\tif(\"Sphericity Corrections\" %in% names(anova.results)){\n    rk.header(\"Sphericity Corrections\", level=3)\n    rk.print(anova.results[[\"Sphericity Corrections\"]])\n  } else {}\n");
	echo("\tif(\"Levene's Test for Homgeneity\" %in% names(anova.results)){\n    rk.header(\"Levene's Test for Homgeneity\", level=3)\n    rk.print(anova.results[[\"Levene's Test for Homgeneity\"]])\n  } else {}\n");
	//// save result object
	// read in saveobject variables
	var svbSvrsltst = getValue("svb_Svrsltst");
	var svbSvrsltstActive = getValue("svb_Svrsltst.active");
	var svbSvrsltstParent = getValue("svb_Svrsltst.parent");
	// assign object to chosen environment
	if(svbSvrsltstActive) {
		echo(".GlobalEnv$" + svbSvrsltst + " <- anova.results\n");
	}

}

