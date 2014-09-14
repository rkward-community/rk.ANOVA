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
	var vrslFktrXAch = getValue("vrsl_FktrXAch");
	var vrslAntwrtvk = getValue("vrsl_Antwrtvk");
	var vrslGrppnfkS = getValue("vrsl_GrppnfkS");
	var radPlotTyp = getValue("rad_PlotTyp");
	var chcStndrdfh = getValue("chc_Stndrdfh");
	var chcLegende = getValue("chc_Legende");
	var radElemente = getValue("rad_Elemente");
	var radBalken = getValue("rad_Balken");
	var inpLgndnbsc = getValue("inp_Lgndnbsc");

	// create the plot
	if(full) {
		echo("rk.header(\"Interaktionsplot\")\n");
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
	if(radPlotTyp == "line") {
		echo("\t\tlineplot.CI(");
	} else {
		echo("\t\tbargraph.CI(");
	}
	if(vrslFktrXAch) {
		echo("\n\t\t\tx.factor=" + vrslFktrXAch);
	}
	if(vrslAntwrtvk) {
		echo(",\n\t\t\tresponse=" + vrslAntwrtvk);
	}
	if(vrslGrppnfkS) {
		echo(",\n\t\t\tgroup=" + vrslGrppnfkS);
	}
	if(radPlotTyp == "line" & radElemente != "b") {
		echo(",\n\t\t\ttype=\"" + radElemente + "\"");
	}
	if(radPlotTyp == "bar" & radBalken == "split") {
		echo(",\n\t\t\tsplit=TRUE");
	}
	if(radPlotTyp == "line" & !chcLegende & vrslGrppnfkS != "") {
		echo(",\n\t\t\tlegend=FALSE");
	}
	if(radPlotTyp == "bar" & chcLegende == "true" & vrslGrppnfkS != "") {
		echo(",\n\t\t\tlegend=TRUE");
	}
	if(chcLegende == "true" & vrslGrppnfkS != "" & inpLgndnbsc != "") {
		echo(",\n\t\t\ttrace.label=\"" + inpLgndnbsc + "\"");
	}
	if(!chcStndrdfh) {
		echo(",\n\t\t\tci.fun=function(x)c(mean(x, na.rm=TRUE), mean(x, na.rm=TRUE))");
	}
	echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
	echo(")");

	// insert any option-setting code that should be run after the actual plot:
	printIndentedUnlessEmpty("\t\t", embRkwrdpltptnGCodeCalculate, "\n", "");

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
}