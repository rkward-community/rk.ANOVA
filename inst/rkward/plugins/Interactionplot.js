// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here
	echo("require(sciplot)\n");
}

function calculate(){
}

function printout(){
	// all the real work is moved to a custom defined function doPrintout() below
	// true in this case means: We want all the headers that should be printed in the output:
	doPrintout(true);
}

function preview(){
	preprocess();
	calculate();
	doPrintout(false);
}

function doPrintout(full){
	// read in variables from dialog

	var vrslFactrxxs = getString("vrsl_Factrxxs");
	var vrslRspnsvct = getString("vrsl_Rspnsvct");
	var vrslGrpngfct = getString("vrsl_Grpngfct");
	var radPlottype = getString("rad_Plottype");
	var radElements = getString("rad_Elements");
	var radBars = getString("rad_Bars");
	var drpClipping = getString("drp_Clipping");
	var inpLegndlbl = getString("inp_Legndlbl");
	var chcUpperrrr = getBoolean("chc_Upperrrr.state");
	var chcLowerrrr = getBoolean("chc_Lowerrrr.state");
	var frmLegendChecked = getBoolean("frm_Legend.checked");
	var frmDrwstndrChecked = getBoolean("frm_Drwstndr.checked");

	// create the plot
	if(full) {
		new Header(i18n("Interaction plot")).print();

	}

	// in case there are generic plot options defined:
	var embRkwrdpltptnGCodePreprocess = getValue("emb_rkwrdpltptnG.code.preprocess");
	var embRkwrdpltptnGCodePrintout = getValue("emb_rkwrdpltptnG.code.printout");
	var embRkwrdpltptnGCodeCalculate = getValue("emb_rkwrdpltptnG.code.calculate");

	if(full) {
		echo("rk.graph.on()\n");
	}
	echo("\ttry({\n");

	// insert any option-setting code that should be run before the actual plotting commands:
	printIndentedUnlessEmpty("\t\t", embRkwrdpltptnGCodePreprocess, "\n", "");

	// the actual plot:
	var frmLegendChecked = getValue("frm_Legend.checked");
	var frmDrwstndrChecked = getValue("frm_Drwstndr.checked");
	if(radPlottype == "line") {
		echo("\t\tlineplot.CI(");
	} else {
		echo("\t\tbargraph.CI(");
	}
	if(vrslFactrxxs) {
		echo("\n\t\t\tx.factor=" + vrslFactrxxs);
	}
	if(vrslRspnsvct) {
		echo(",\n\t\t\tresponse=" + vrslRspnsvct);
	}
	if(vrslGrpngfct) {
		echo(",\n\t\t\tgroup=" + vrslGrpngfct);
	}
	if(radPlottype == "line") {
		if(radElements != "b") {
		echo(",\n\t\t\ttype=\"" + radElements + "\"");
	}
	if(!frmLegendChecked & vrslGrpngfct != "") {
		echo(",\n\t\t\tlegend=FALSE");
	}
	if(!frmDrwstndrChecked) {
		echo(",\n\t\t\tci.fun=function(x)c(mean(x, na.rm=TRUE), mean(x, na.rm=TRUE))");
	}
	} else {
		if(radBars == "split") {
		echo(",\n\t\t\tsplit=TRUE");
	}
	if(frmLegendChecked & vrslGrpngfct != "") {
		echo(",\n\t\t\tlegend=TRUE");
	}
	if(!frmDrwstndrChecked) {
		echo(",\n\t\t\tuc=FALSE,\n\t\t\tlc=FALSE");
	}
	if(frmDrwstndrChecked & !chcUpperrrr) {
		echo(",\n\t\t\tuc=FALSE");
	}
	if(frmDrwstndrChecked & !chcLowerrrr) {
		echo(",\n\t\t\tlc=FALSE");
	}
	if(drpClipping == "figure") {
		echo(",\n\t\t\txpd=TRUE");
	} else if(drpClipping == "device") {
		echo(",\n\t\t\txpd=NA");
	}
	}
	if(frmLegendChecked & vrslGrpngfct != "" & inpLegndlbl != "") {
		echo(",\n\t\t\tleg.lab=\"" + inpLegndlbl + "\"");
	}
	echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
	echo("\n\t\t)");

	// insert any option-setting code that should be run after the actual plot:
	printIndentedUnlessEmpty("\t\t", embRkwrdpltptnGCodeCalculate, "\n", "");

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
}