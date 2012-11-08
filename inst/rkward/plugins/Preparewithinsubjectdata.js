// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here

}

function calculate(){
	// read in variables from dialog
	var vrslSlctllvr = getValue("vrsl_Slctllvr");
	var vrslDpndntrs = getValue("vrsl_Dpndntrs");
	var inpNmfrdpnd = getValue("inp_Nmfrdpnd");
	var inpNmfrxprm = getValue("inp_Nmfrxprm");
	var chcAtmtccss = getValue("chc_Atmtccss");
	var inpNmfrcssb = getValue("inp_Nmfrcssb");
	var vrslCssbjctd = getValue("vrsl_Cssbjctd");
	var vrslBtwnsbjc = getValue("vrsl_Btwnsbjc");
	var svbSvrsltst = getValue("svb_Svrsltst");

	// the R code to be evaluated
	var vrslDpndntrsShortname = getValue("vrsl_Dpndntrs.shortname").split("\n").join("\", \"");
	var vrslDpndntrs = getValue("vrsl_Dpndntrs").split("\n").join(",\n\t\t\t");
	var vrslCssbjctdShortname = getValue("vrsl_Cssbjctd.shortname");
	var vrslBtwnsbjcShortname = getValue("vrsl_Btwnsbjc.shortname");
	var lngVrslBtwnsbjc = getValue("vrsl_Btwnsbjc").split("\n").join(",\n\t\t\t");
	if(vrslSlctllvr) {
		echo("\tnum.cases <- nrow(" + vrslSlctllvr + ")\n");
	} else {
		echo("\tnum.cases <- unique(sapply(list(\n\t\t\t" + vrslDpndntrs);
		if(!chcAtmtccss && vrslCssbjctd) {
			echo(",\n\t\t\t" + vrslCssbjctd);
		}
		if(vrslBtwnsbjc) {
			echo(",\n\t\t\t" + lngVrslBtwnsbjc);
		}
		echo("),\n\t\tlength))\n\tif(length(num.cases) > 1) {" + "\n\t\tstop(simpleError(\"Can't determine number of cases, variables don't have equal length!\"))" + "\n\t}\n");
	}
	if(vrslDpndntrs) {
		echo("\tanova.conditions <- c(\"" + vrslDpndntrsShortname + "\")\n\tnum.conditions <- length(anova.conditions)\n\n");
	} else {}
	if(vrslBtwnsbjc) {
		var betweenVarsNames = vrslBtwnsbjcShortname.split("\n");
	var betweenVars = vrslBtwnsbjc.split("\n");
	} else {
		var betweenVars = "";
	}
	echo("\tanova.data <- data.frame(");
	if(vrslDpndntrs) {
		echo("\n\t\t" + inpNmfrdpnd + "=c(\n\t\t\t" + vrslDpndntrs + ")" + ",\n\t\t" + inpNmfrxprm + "=factor(rep(anova.conditions, each=num.cases))");
	} else {}
	if(chcAtmtccss && inpNmfrcssb) {
		echo(",\n\t\t" + inpNmfrcssb + "=factor(rep(1:num.cases, times=num.conditions))");
	} else {}
	if(!chcAtmtccss && vrslCssbjctd) {
		echo(",\n\t\t" + vrslCssbjctdShortname + "=factor(rep(" + vrslCssbjctd + ", times=num.conditions))");
	} else {}
	if(vrslBtwnsbjc) {
		for (var i=0, len=betweenVarsNames.length; i<len; ++i ){
			echo(",\n\t\t" + betweenVarsNames[i] + "=factor(rep(" + betweenVars[i] + ", times=num.conditions))");
		}
	} else {}
	echo(",\n\t\tstringsAsFactors=FALSE)\n\n");
}

function printout(){
	// printout the results
	echo("rk.header(\"Prepare within subject data results\")\n");

	echo("\trk.print(summary(anova.data))\n");
	//// save result object
	// read in saveobject variables
	var svbSvrsltst = getValue("svb_Svrsltst");
	var svbSvrsltstActive = getValue("svb_Svrsltst.active");
	var svbSvrsltstParent = getValue("svb_Svrsltst.parent");
	// assign object to chosen environment
	if(svbSvrsltstActive) {
		echo(".GlobalEnv$" + svbSvrsltst + " <- anova.data\n");
	}

}

