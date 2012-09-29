// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here

}

function calculate(){
	// read in variables from dialog
	var radDatafrmt = getValue("rad_Datafrmt");
	var vrslRspnsvct = getValue("vrsl_Rspnsvct");
	var vrslGrpngvct = getValue("vrsl_Grpngvct");
	var vrslSprtrsp3 = getValue("vrsl_Sprtrsp3");
	var drpMthdfrdj = getValue("drp_Mthdfrdj");
	var chcPldSDfrl = getValue("chc_PldSDfrl");
	var chcPrdtTsts = getValue("chc_PrdtTsts");
	var radAltrntvh = getValue("rad_Altrntvh");

	// the R code to be evaluated
	if(radDatafrmt == "one") {
		echo("\tpair.t.results <- pairwise.t.test(\n\t\t");
		if(vrslRspnsvct) {
			echo("x=" + vrslRspnsvct);
		}
		if(vrslGrpngvct) {
			echo(",\n\t\tg=" + vrslGrpngvct);
		}
	} else {
		var vrslSprtrsp3 = getValue("vrsl_Sprtrsp3").split("\n").join(", ");
		echo("\t# simple helper function to get the names of the objects\n");
		echo("\tgrouping.vector <- function(...){\n\tunlist(lapply(match.call()[-1], function(x){rep(deparse(x), length(eval(x)))}))\n}\n");
		if(vrslSprtrsp3) {
			echo("\t# create data and grouping vectors\n\tdata <- c(" + vrslSprtrsp3 + ")\n\tgroup <- grouping.vector(" + vrslSprtrsp3 + ")\n\n");
		}
		echo("\t# the actual pairwise t-tests, using the prepared data\n\tpair.t.results <- pairwise.t.test(\n\t\t");
		if(vrslSprtrsp3) {
			echo("x=data,\n\t\tg=group");
		}
	}
	if(drpMthdfrdj) {
		echo(",\n\t\tp.adjust.method=\"" + drpMthdfrdj + "\"");
	} else {}
	if(chcPldSDfrl) {
		echo(",\n\t\tpool.sd=TRUE");
	} else {}
	if(chcPrdtTsts) {
		echo(",\n\t\tpaired=TRUE");
	} else {}
	if(radAltrntvh != "two.sided") {
		echo(",\n\t\talternative=\"" + radAltrntvh + "\"");
	} else {}
	echo(")\n\n");
}

function printout(){
	// printout the results
	echo("rk.header(\"Pairwise t-Tests results\")\n");

	echo("rk.print(pair.t.results)\n");

}

