// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here
	var chcUntrdMLP = getValue("chc_UntrdMLP");
	if(chcUntrdMLP) {
		echo("suppressMessages(require(" + "ez" + "))\n");
	} else {
		echo("require(" + "ez" + ")\n");
	}
}

function calculate(){
	// read in variables from dialog
	var vrslDtnmssnd = getValue("vrsl_Dtnmssnd");
	var radDesign = getValue("rad_Design");
	var vrslAbhnggVr = getValue("vrsl_AbhnggVr");
	var vrslFllPrsnn = getValue("vrsl_FllPrsnn");
	var vrslWthnSbjV = getValue("vrsl_WthnSbjV");
	var vrslBtwnSbjV = getValue("vrsl_BtwnSbjV");
	var vrslBbchttVr = getValue("vrsl_BbchttVr");
	var drpQdrtsmmD = getValue("drp_QdrtsmmD");
	var drpHtrskdst = getValue("drp_Htrskdst");
	var chcZgQdrtLR = getValue("chc_ZgQdrtLR");
	var chcGbvObjkt = getValue("chc_GbvObjkt");
	var chcUntrdMLP = getValue("chc_UntrdMLP");
	var svbSchrErgW = getValue("svb_SchrErgW");

	// the R code to be evaluated
	var vrslAbhnggVrShortname = getValue("vrsl_AbhnggVr.shortname").split("\n").join(", ");
	var vrslFllPrsnnShortname = getValue("vrsl_FllPrsnn.shortname").split("\n").join(", ");
	var vrslWthnSbjVShortname = getValue("vrsl_WthnSbjV.shortname").split("\n").join(", ");
	var vrslBtwnSbjVShortname = getValue("vrsl_BtwnSbjV.shortname").split("\n").join(", ");
	var vrslBbchttVrShortname = getValue("vrsl_BbchttVr.shortname").split("\n").join(", ");
	if(drpQdrtsmmD == 3) {
		echo("\t# setze Kontraste f&uuml;r korrekte Typ-3-ANOVA\n\toptions(contrasts=c(\"contr.sum\",\"contr.poly\"))\n");
	} else {}
	if(vrslFllPrsnn == "" & radDesign == "between") {
		echo("\t# ezANOVA verlangt eine Variable zur Fall/Personunterscheidung\n\t" + vrslDtnmssnd + " <- cbind(" + vrslDtnmssnd + ", ez.subject.ID.dummy=factor(1:nrow(" + vrslDtnmssnd + ")))\n");
	} else {}
	echo("\tanova.results <- ezANOVA(");
	if(vrslDtnmssnd) {
		echo("\n\t\tdata=" + vrslDtnmssnd);
	} else {}
	if(vrslAbhnggVr) {
		echo(",\n\t\tdv=.(" + vrslAbhnggVrShortname + ")");
	} else {}
	if(vrslFllPrsnn) {
		echo(",\n\t\twid=.(" + vrslFllPrsnnShortname + ")");
	} else if(radDesign == "between") {
		echo(",\n\t\twid=.(ez.subject.ID.dummy)");
	}
	if(vrslWthnSbjV != "" & radDesign != "between") {
		echo(",\n\t\twithin=.(" + vrslWthnSbjVShortname + ")");
	} else {}
	if(vrslBtwnSbjV != "" & radDesign != "within") {
		echo(",\n\t\tbetween=.(" + vrslBtwnSbjVShortname + ")");
	} else {}
	if(vrslBbchttVr) {
		echo(",\n\t\tobserved=.(" + vrslBbchttVrShortname + ")");
	} else {}
	if(drpQdrtsmmD != 2) {
		echo(",\n\t\ttype=" + drpQdrtsmmD);
	} else {}
	if(drpHtrskdst != "false") {
		echo(",\n\t\twhite.adjust=\"" + drpHtrskdst + "\"");
	} else {}
	if(chcZgQdrtLR) {
		echo(",\n\t\tdetailed=TRUE");
	} else {}
	if(chcGbvObjkt) {
		echo(",\n\t\treturn_aov=TRUE");
	} else {}
	echo(")\n\n");
}

function printout(){
	// printout the results
	echo("rk.header(\"ANOVA-Ergebnisse\")\n");

	echo("rk.print(anova.results[[\"ANOVA\"]])\n");
	echo("\tif(\"Mauchly's Test for Sphericity\" %in% names(anova.results)){\n    rk.header(\"Sph&auml;rizit&auml;tstest nach Mauchly\", level=3)\n    rk.print(anova.results[[\"Mauchly's Test for Sphericity\"]])\n  } else {}\n");
	echo("\tif(\"Sphericity Corrections\" %in% names(anova.results)){\n    rk.header(\"Sph&auml;rizit&auml;tskorrektur\", level=3)\n    rk.print(anova.results[[\"Sphericity Corrections\"]])\n  } else {}\n");
	echo("\tif(\"Levene's Test for Homgeneity\" %in% names(anova.results)){\n    rk.header(\"Homogenit&auml;tstest nach Levene\", level=3)\n    rk.print(anova.results[[\"Levene's Test for Homgeneity\"]])\n  } else {}\n");
	//// save result object
	// read in saveobject variables
	var svbSchrErgW = getValue("svb_SchrErgW");
	var svbSchrErgWActive = getValue("svb_SchrErgW.active");
	var svbSchrErgWParent = getValue("svb_SchrErgW.parent");
	// assign object to chosen environment
	if(svbSchrErgWActive) {
		echo(".GlobalEnv$" + svbSchrErgW + " <- anova.results\n");
	}

}

