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
	var vrslFactrxxs = getValue("vrsl_Factrxxs");
	var vrslRspnsvct = getValue("vrsl_Rspnsvct");
	var vrslGrpngfct = getValue("vrsl_Grpngfct");
	var radPlottype = getValue("rad_Plottype");
	var chcStndrdrr = getValue("chc_Stndrdrr");
	var chcLegend = getValue("chc_Legend");
	var radElements = getValue("rad_Elements");
	var radBars = getValue("rad_Bars");
	var inpLegndlbl = getValue("inp_Legndlbl");

	// create the plot
	if(full) {
		echo("rk.header(\"Interaction plot\")\n");
	}

	// in case there are generic plot options defined:
	var embGnrcpltpCodePreprocess = getValue("emb_Gnrcpltp.code.preprocess");
	var embGnrcpltpCodePrintout = getValue("emb_Gnrcpltp.code.printout");
	var embGnrcpltpCodeCalculate = getValue("emb_Gnrcpltp.code.calculate");

	if(full) {
		echo("rk.graph.on()\n");
	}
	echo("\ttry({\n");

	// insert any option-setting code that should be run before the actual plotting commands:
	printIndentedUnlessEmpty("\t\t", embGnrcpltpCodePreprocess, "\n", "");

	// the actual plot:
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
	if(radPlottype == "line" & radElements != "b") {
		echo(",\n\t\t\ttype=\"" + radElements + "\"");
	}
	if(radPlottype == "bar" & radBars == "split") {
		echo(",\n\t\t\tsplit=TRUE");
	}
	if(radPlottype == "line" & !chcLegend & vrslGrpngfct != "") {
		echo(",\n\t\t\tlegend=FALSE");
	}
	if(radPlottype == "bar" & chcLegend == "true" & vrslGrpngfct != "") {
		echo(",\n\t\t\tlegend=TRUE");
	}
	if(chcLegend == "true" & vrslGrpngfct != "" & inpLegndlbl != "") {
		echo(",\n\t\t\ttrace.label=\"" + inpLegndlbl + "\"");
	}
	if(!chcStndrdrr) {
		echo(",\n\t\t\tci.fun=function(x)c(mean(x, na.rm=TRUE), mean(x, na.rm=TRUE))");
	}
	echo(embGnrcpltpCodePrintout.replace(/, /g, ",\n\t\t\t"));
	echo(")");

	// insert any option-setting code that should be run after the actual plot:
	printIndentedUnlessEmpty("\t\t", embGnrcpltpCodeCalculate, "\n", "");

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
}