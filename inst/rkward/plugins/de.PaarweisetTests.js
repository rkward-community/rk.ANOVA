// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here

}

function calculate(){
	// read in variables from dialog
	var radDatnfrmt = getValue("rad_Datnfrmt");
	var vrslAntwrtvk = getValue("vrsl_Antwrtvk");
	var vrslGrppnvkt = getValue("vrsl_Grppnvkt");
	var vrslSprtAnt3 = getValue("vrsl_SprtAnt3");
	var drpMthdzrWA = getValue("drp_MthdzrWA");
	var chcGpltStnG = getValue("chc_GpltStnG");
	var chcPrwstTst = getValue("chc_PrwstTst");
	var radAltrntvh = getValue("rad_Altrntvh");

	// the R code to be evaluated
	if(radDatnfrmt == "one") {
		echo("\tpair.t.results <- pairwise.t.test(\n\t\t");
		if(vrslAntwrtvk) {
			echo("x=" + vrslAntwrtvk);
		}
		if(vrslGrppnvkt) {
			echo(",\n\t\tg=" + vrslGrppnvkt);
		}
	} else {
		var vrslSprtAnt3 = getValue("vrsl_SprtAnt3").split("\n").join(", ");
		echo("\t# einfache Hilfsfunktion um die Namen der Objekte zu ermitteln\n");
		echo("\tgrouping.vector <- function(...){\n\tunlist(lapply(match.call()[-1], function(x){rep(deparse(x), length(eval(x)))}))\n}\n");
		if(vrslSprtAnt3) {
			echo("\t# Erzeuge Daten- und Gruppenvektoren\n\tdata <- c(" + vrslSprtAnt3 + ")\n\tgroup <- grouping.vector(" + vrslSprtAnt3 + ")\n\n");
		}
		echo("\t# die eigentlichen paarweisen t-Tests, über die vorbereiteten Daten\n\tpair.t.results <- pairwise.t.test(\n\t\t");
		if(vrslSprtAnt3) {
			echo("x=data,\n\t\tg=group");
		}
	}
	if(drpMthdzrWA) {
		echo(",\n\t\tp.adjust.method=\"" + drpMthdzrWA + "\"");
	} else {}
	if(chcGpltStnG) {
		echo(",\n\t\tpool.sd=TRUE");
	} else {}
	if(chcPrwstTst) {
		echo(",\n\t\tpaired=TRUE");
	} else {}
	if(radAltrntvh != "two.sided") {
		echo(",\n\t\talternative=\"" + radAltrntvh + "\"");
	} else {}
	echo(")\n\n");
}

function printout(){
	// printout the results
	echo("rk.header(\"Paarweise t-Tests\")\n");

	echo("rk.print(pair.t.results)\n");

}

