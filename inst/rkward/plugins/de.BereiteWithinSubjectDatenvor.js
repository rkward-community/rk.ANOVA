// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here

}

function calculate(){
	// read in variables from dialog
	var vrslWhlllVrb = getValue("vrsl_WhlllVrb");
	var vrslAbhnggAn = getValue("vrsl_AbhnggAn");
	var inpBzchnngV = getValue("inp_BzchnngV");
	var inpBzchnngE = getValue("inp_BzchnngE");
	var chcAtmtscFP = getValue("chc_AtmtscFP");
	var inpBzchnnFP = getValue("inp_BzchnnFP");
	var vrslFllPrsnn = getValue("vrsl_FllPrsnn");
	var vrslBtwnSbjV = getValue("vrsl_BtwnSbjV");
	var svbSchrErgW = getValue("svb_SchrErgW");

	// the R code to be evaluated
	var vrslAbhnggAnShortname = getValue("vrsl_AbhnggAn.shortname").split("\n").join("\", \"");
	var vrslAbhnggAn = getValue("vrsl_AbhnggAn").split("\n").join(",\n\t\t\t");
	var vrslFllPrsnnShortname = getValue("vrsl_FllPrsnn.shortname");
	var vrslBtwnSbjVShortname = getValue("vrsl_BtwnSbjV.shortname");
	var lngVrslBtwnSbjV = getValue("vrsl_BtwnSbjV").split("\n").join(",\n\t\t\t");
	if(vrslWhlllVrb) {
		echo("\tnum.cases <- nrow(" + vrslWhlllVrb + ")\n");
	} else {
		echo("\tnum.cases <- unique(sapply(list(\n\t\t\t" + vrslAbhnggAn);
		if(!chcAtmtscFP && vrslFllPrsnn) {
			echo(",\n\t\t\t" + vrslFllPrsnn);
		}
		if(vrslBtwnSbjV) {
			echo(",\n\t\t\t" + lngVrslBtwnSbjV);
		}
		echo("),\n\t\tlength))\n\tif(length(num.cases) > 1) {" + "\n\t\tstop(simpleError(\"Kann die Anzahl der Fälle nicht ermitteln, Variablen haben nicht die gleiche Länge!\"))" + "\n\t}\n");
	}
	if(vrslAbhnggAn) {
		echo("\tanova.conditions <- c(\"" + vrslAbhnggAnShortname + "\")\n\tnum.conditions <- length(anova.conditions)\n\n");
	} else {}
	if(vrslBtwnSbjV) {
		var betweenVarsNames = vrslBtwnSbjVShortname.split("\n");
	var betweenVars = vrslBtwnSbjV.split("\n");
	} else {
		var betweenVars = "";
	}
	echo("\tanova.data <- data.frame(");
	if(vrslAbhnggAn) {
		echo("\n\t\t" + inpBzchnngV + "=c(\n\t\t\t" + vrslAbhnggAn + ")" + ",\n\t\t" + inpBzchnngE + "=factor(rep(anova.conditions, each=num.cases))");
	} else {}
	if(chcAtmtscFP && inpBzchnnFP) {
		echo(",\n\t\t" + inpBzchnnFP + "=factor(rep(1:num.cases, times=num.conditions))");
	} else {}
	if(!chcAtmtscFP && vrslFllPrsnn) {
		echo(",\n\t\t" + vrslFllPrsnnShortname + "=factor(rep(" + vrslFllPrsnn + ", times=num.conditions))");
	} else {}
	if(vrslBtwnSbjV) {
		for (var i=0, len=betweenVarsNames.length; i<len; ++i ){
			echo(",\n\t\t" + betweenVarsNames[i] + "=factor(rep(" + betweenVars[i] + ", times=num.conditions))");
		}
	} else {}
	echo(",\n\t\tstringsAsFactors=FALSE)\n\n");
}

function printout(){
	// printout the results
	echo("rk.header(\"Bereite Within-Subject-Daten vor\")\n");

	echo("\trk.print(summary(anova.data))\n");
	//// save result object
	// read in saveobject variables
	var svbSchrErgW = getValue("svb_SchrErgW");
	var svbSchrErgWActive = getValue("svb_SchrErgW.active");
	var svbSchrErgWParent = getValue("svb_SchrErgW.parent");
	// assign object to chosen environment
	if(svbSchrErgWActive) {
		echo(".GlobalEnv$" + svbSchrErgW + " <- anova.data\n");
	}

}

